import xss from 'xss';

/**
 * Validates AI outputs to prevent malicious injection and ensure formatting.
 * Typically applied after AI generates a response but before it is saved to DB.
 */
export const aiSafetyValidator = (aiResponse) => {
  const result = {
    isSafe: true,
    flags: [],
    sanitizedResponse: aiResponse,
  };

  if (!aiResponse) return result;

  // If response is an object (JSON generation)
  if (typeof aiResponse === 'object') {
    let stringified = JSON.stringify(aiResponse);
    
    // Check for script tags
    if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(stringified)) {
      result.isSafe = false;
      result.flags.push('Detected potential script injection (XSS).');
    }

    // Check JSON-LD structural sanity (if it's generating schema)
    if (aiResponse['@context'] && aiResponse['@context'] !== 'https://schema.org') {
      result.isSafe = false;
      result.flags.push('Invalid JSON-LD context detected.');
    }

    // Sanitize string values
    const sanitizeObject = (obj) => {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = xss(obj[key]); // Strip malicious HTML
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };
    
    // Deep clone and sanitize
    result.sanitizedResponse = JSON.parse(stringified);
    sanitizeObject(result.sanitizedResponse);

  } else if (typeof aiResponse === 'string') {
    if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(aiResponse)) {
      result.isSafe = false;
      result.flags.push('Detected potential script injection (XSS).');
    }
    result.sanitizedResponse = xss(aiResponse);
  }

  return result;
};

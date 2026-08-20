/**
 * SEO Validation Engine — Backend Utility
 *
 * Pure validation functions for SEO records.
 * Used by SeoService.validateAllConfigs() which is triggered via
 * Admin Dashboard → SEO Command Center → "Scan Routes" button.
 *
 * Returns ValidationResult[] for each record with severity: error | warning | info
 */

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

/**
 * Validates a single SEO record and returns all detected issues.
 * @param {object} record - A Seo MongoDB document
 * @returns {Array} issues - Array of { type, severity, message, field, detectedAt }
 */
export function validateSeoRecord(record) {
  const issues = [];
  const { path, metaTitle, metaDescription, keywords, canonicalUrl, openGraph } = record;

  // ── Title ────────────────────────────────────────
  if (!metaTitle || metaTitle.trim() === '') {
    issues.push({
      type: 'missing_title',
      severity: 'error',
      message: 'Meta title is missing. Every page must have a unique title.',
      field: 'metaTitle',
      detectedAt: new Date()
    });
  } else {
    if (metaTitle.length < TITLE_MIN) {
      issues.push({
        type: 'title_too_short',
        severity: 'warning',
        message: `Title "${metaTitle}" is too short (${metaTitle.length} chars). Recommended: ${TITLE_MIN}–${TITLE_MAX} characters.`,
        field: 'metaTitle',
        detectedAt: new Date()
      });
    }
    if (metaTitle.length > TITLE_MAX) {
      issues.push({
        type: 'title_too_long',
        severity: 'warning',
        message: `Title "${metaTitle}" is too long (${metaTitle.length} chars). Keep under ${TITLE_MAX} characters to avoid truncation in SERPs.`,
        field: 'metaTitle',
        detectedAt: new Date()
      });
    }
  }

  // ── Description ──────────────────────────────────
  if (!metaDescription || metaDescription.trim() === '') {
    issues.push({
      type: 'missing_description',
      severity: 'error',
      message: 'Meta description is missing. Every page needs a description to appear in Google search snippets.',
      field: 'metaDescription',
      detectedAt: new Date()
    });
  } else {
    if (metaDescription.length < DESC_MIN) {
      issues.push({
        type: 'description_too_short',
        severity: 'warning',
        message: `Description is too short (${metaDescription.length} chars). Recommended: ${DESC_MIN}–${DESC_MAX} characters.`,
        field: 'metaDescription',
        detectedAt: new Date()
      });
    }
    if (metaDescription.length > DESC_MAX) {
      issues.push({
        type: 'description_too_long',
        severity: 'warning',
        message: `Description is too long (${metaDescription.length} chars). Google truncates at ~${DESC_MAX} chars in search results.`,
        field: 'metaDescription',
        detectedAt: new Date()
      });
    }
  }

  // ── Keywords ─────────────────────────────────────
  if (!keywords || keywords.length === 0) {
    issues.push({
      type: 'missing_keywords',
      severity: 'info',
      message: 'No keywords specified. While not a direct ranking signal, keywords help categorise content internally.',
      field: 'keywords',
      detectedAt: new Date()
    });
  }

  // ── OG Image ─────────────────────────────────────
  const ogImage = openGraph?.image;
  if (!ogImage || ogImage.trim() === '') {
    issues.push({
      type: 'missing_og_image',
      severity: 'warning',
      message: 'Open Graph image is missing. Social media shares will use a generic fallback image.',
      field: 'openGraph.image',
      detectedAt: new Date()
    });
  }

  // ── Canonical URL ────────────────────────────────
  if (!canonicalUrl) {
    issues.push({
      type: 'missing_canonical',
      severity: 'warning',
      message: 'No explicit canonical URL set. The system will generate one automatically from the path.',
      field: 'canonicalUrl',
      detectedAt: new Date()
    });
  } else {
    try {
      const url = new URL(canonicalUrl);
      if (!url.hostname) throw new Error('No hostname');
    } catch {
      issues.push({
        type: 'missing_canonical',
        severity: 'error',
        message: `Canonical URL "${canonicalUrl}" is not a valid absolute URL. Must start with https://`,
        field: 'canonicalUrl',
        detectedAt: new Date()
      });
    }
  }

  return issues;
}

/**
 * Checks for duplicate titles across all SEO records.
 * Duplicate titles confuse Google about which page to rank.
 * @param {Array<{path: string, title: string}>} entries
 * @returns {Array} duplicate issues for affected paths
 */
export function checkDuplicateTitles(entries) {
  const titleMap = {};
  const issues = [];

  for (const entry of entries) {
    if (!entry.title) continue;
    const normalised = entry.title.trim().toLowerCase();
    if (!titleMap[normalised]) {
      titleMap[normalised] = [];
    }
    titleMap[normalised].push(entry.path);
  }

  for (const [title, paths] of Object.entries(titleMap)) {
    if (paths.length > 1) {
      for (const path of paths) {
        issues.push({
          type: 'duplicate_title',
          severity: 'error',
          message: `Duplicate title detected across ${paths.length} paths: ${paths.join(', ')}. Each page must have a unique title.`,
          field: 'metaTitle',
          path,
          detectedAt: new Date()
        });
      }
    }
  }

  return issues;
}

/**
 * Validates robots directives string for syntax correctness.
 * Used when parsing Admin-configured robots.txt rules.
 * @param {string} robotsText - robots.txt content string
 * @returns {Array} issues
 */
export function validateRobotsText(robotsText) {
  const issues = [];
  if (!robotsText) return issues;

  const lines = robotsText.split('\n').map(l => l.trim()).filter(Boolean);
  const validDirectives = ['user-agent', 'allow', 'disallow', 'crawl-delay', 'sitemap', 'host', '#'];

  for (const line of lines) {
    const directive = line.split(':')[0]?.toLowerCase().trim();
    if (!directive) continue;
    if (!validDirectives.some(d => directive.startsWith(d))) {
      issues.push({
        type: 'invalid_robots',
        severity: 'warning',
        message: `Unknown robots.txt directive: "${line}". Valid directives are: ${validDirectives.join(', ')}`,
        field: 'robotsRules',
        detectedAt: new Date()
      });
    }
  }

  return issues;
}

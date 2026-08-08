export const extractPageContext = () => {
  if (typeof window === 'undefined') return { title: '', url: '', content: '' };

  const url = window.location.href;
  const path = window.location.pathname;
  
  // Extract Title
  const title = document.title;
  
  // Extract main headings
  const headings = Array.from(document.querySelectorAll('h1, h2'))
    .map(el => (el as HTMLElement).innerText)
    .filter(text => text.length > 0)
    .slice(0, 5); // Take top 5 headings to avoid massive context
    
  // Extract meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  const description = metaDescription ? (metaDescription as HTMLMetaElement).content : '';

  // Specific content targeting based on route
  let specificContent = '';
  
  if (path.includes('/blog/')) {
    // Try to grab the main article content (assumes there is an article or main tag)
    const article = document.querySelector('article') || document.querySelector('main');
    if (article) {
      // get first 1000 chars of text content
      specificContent = (article as HTMLElement).innerText.substring(0, 1000);
    }
  } else if (path.includes('/store/')) {
    const productInfo = document.querySelector('.product-details') || document.querySelector('main');
    if (productInfo) {
      specificContent = (productInfo as HTMLElement).innerText.substring(0, 1000);
    }
  }

  return {
    url,
    path,
    title,
    headings,
    description,
    specificContent
  };
};

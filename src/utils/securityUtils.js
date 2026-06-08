/**
 * Simple client-side HTML sanitizer to mitigate XSS attacks (OWASP Cross-Site Scripting).
 * Removes scripts, object/embed/iframe tags, inline events, and javascript: links.
 */
export const sanitizeHTML = (dirtyHTML) => {
  if (!dirtyHTML || typeof dirtyHTML !== 'string') return '';

  // 1. Remove script tags and their content
  let clean = dirtyHTML.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');

  // 2. Remove other dangerous tags like iframe, object, embed, frame, frameset, applet, meta, link
  clean = clean.replace(/<\/?(iframe|object|embed|frame|frameset|applet|meta|link|style)[^>]*>/gi, '');

  // 3. Remove inline events (e.g. onload, onerror, onclick, onmouseover)
  // Match any attribute starting with "on" followed by word characters and equal sign: onxxx=
  clean = clean.replace(/(\s)on[a-zA-Z]+=(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '$1');

  // 4. Remove javascript: pseudo-protocol in href, src, etc.
  clean = clean.replace(/(href|src|action)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|[^\s>]*javascript:[^\s>]*)/gi, '$1="#"');

  return clean;
};

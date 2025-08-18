// Utility function to decode HTML entities
export const decodeHtmlEntities = (text) => {
  if (!text || typeof text !== 'string') return text
  
  // Check if text contains HTML entities
  if (text.includes('&') && text.includes(';')) {
    console.log('Decoding HTML entities in:', text)
    
    try {
      // Try DOM method first
      if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea')
        textarea.innerHTML = text
        const decoded = textarea.value
        console.log('Decoded to:', decoded)
        return decoded
      }
    } catch (error) {
      console.warn('DOM method failed, falling back to regex:', error)
    }
    
    // Fallback to regex method
    return decodeHtmlEntitiesRegex(text)
  }
  
  return text
}

// Alternative method using regex for common HTML entities
export const decodeHtmlEntitiesRegex = (text) => {
  if (!text || typeof text !== 'string') return text
  
  const htmlEntities = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&rsaquo;': '›',
    '&lsaquo;': '‹',
    '&laquo;': '«',
    '&raquo;': '»',
    '&times;': '×',
    '&divide;': '÷',
    '&plusmn;': '±',
    '&deg;': '°',
    '&micro;': 'µ',
    '&para;': '¶',
    '&sect;': '§',
    '&dagger;': '†',
    '&Dagger;': '‡',
    '&permil;': '‰',
    '&euro;': '€',
    '&pound;': '£',
    '&cent;': '¢',
    '&yen;': '¥',
    '&curren;': '¤'
  }
  
  // Check if text contains HTML entities
  if (text.includes('&') && text.includes(';')) {
    console.log('Decoding HTML entities with regex in:', text)
    
    const decoded = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
      return htmlEntities[entity] || entity
    })
    
    console.log('Decoded to:', decoded)
    return decoded
  }
  
  return text
} 
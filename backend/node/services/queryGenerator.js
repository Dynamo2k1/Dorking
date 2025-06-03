const ALLOWED_OPERATORS = [
  'site:',
  'intitle:',
  'inurl:',
  'filetype:',
  'cache:',
  'link:',
  'related:',
  'allinurl:',
  'allintitle:',
  'allintext:',
  'allinanchor:',
  'inanchor:',
  'intext:',
  '"index of"',
  '"sql dump"',
  '"404 Not Found"',
  '"login"',
  '"config"',
  '"backup"',
  '"ftp"',
  '"database"',
  '"admin"',
  '"private"',
  'intitle:"index of"',
  'inurl:/',
  'filetype:bak',
  'filetype:sql',
  'filetype:log',
  'filetype:xls',
  'filetype:pdf',
  'filetype:doc',
  'filetype:csv',
  'filetype:txt',
  'filetype:ppt',
  'filetype:html',
  'inurl:php?',
  'inurl:wp-',
  'inurl:admin',
  'inurl:config',
  'intitle:"admin panel"',
  'intitle:"Login"',
  'intitle:"phpMyAdmin"'
];

const validateQuery = (queryParts) => {
  if (!queryParts || !Array.isArray(queryParts)) {
    throw new Error('Invalid query format');
  }

  const combined = queryParts.join(' ').toLowerCase();

  // Basic validation
  if (!combined.trim()) {
    throw new Error('Query cannot be empty');
  }

  // Remove length check or make it more generous
  if (combined.length > 1000) {
    throw new Error('Query is too long');
  }

  // Check for dangerous characters
  if (/[<>{}]/.test(combined)) {
    throw new Error('Query contains unsafe characters');
  }
};

const generateQuery = (queryParts) => {
  try {
    validateQuery(queryParts);
    return {
      success: true,
      query: queryParts.filter(part => part.trim()).join(' ')
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

module.exports = { generateQuery };
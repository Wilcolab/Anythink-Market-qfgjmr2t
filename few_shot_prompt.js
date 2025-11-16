/**
 * Convert arbitrary text to lower camelCase.
 *
 * - Treats spaces, hyphens, underscores, dots and other non-alphanumeric chars as separators.
 * - Handles existing camelCase / PascalCase boundaries correctly.
 * - Preserves numbers inside tokens (e.g. "field 123" -> "field123").
 * - Collapses multiple separators and trims leading/trailing separators.
 *
 * Example:
 *   toCamelCase('first name') => 'firstName'
 *   toCamelCase('user_id')    => 'userId'
 *   toCamelCase('SCREEN_NAME')=> 'screenName'
 *   toCamelCase('mobile-number') => 'mobileNumber'
 */
function toCamelCase(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);

  // Insert a space between lower/number and upper to separate camelCase boundaries
  const separated = str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim();

  if (!separated) return '';

  const parts = separated.split(/\s+/);
  const first = parts[0].toLowerCase();
  const rest = parts.slice(1).map(p => {
    const lower = p.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join('');

  return first + rest;
}

// Examples when run directly
if (typeof require !== 'undefined' && require && require.main === module) {
  const examples = [
    'first name',
    'user_id',
    'SCREEN_NAME',
    'mobile-number',
    'alreadyCamelCase',
    'PascalCaseExample',
    '',
    null
  ];

  examples.forEach(example => {
    try {
      console.log(`${JSON.stringify(example)} -> ${JSON.stringify(toCamelCase(example))}`);
    } catch (err) {
      console.log(`${JSON.stringify(example)} -> threw ${err}`);
    }
  });
}

module.exports = toCamelCase;

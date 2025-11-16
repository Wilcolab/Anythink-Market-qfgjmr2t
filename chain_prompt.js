/**
 * Convert strings to kebab-case (lowercase words separated by hyphens).
 *
 * Validation rules:
 * - Throws `TypeError` if input is `null`, `undefined`, or not a `string`.
 * - Returns `''` for an empty string input.
 * - Throws `TypeError` for strings that contain only whitespace.
 *
 * Conversion rules:
 * - Splits words on camelCase/PascalCase boundaries, and on any non-alphanumeric separators
 *   (spaces, underscores, hyphens, dots, punctuation, etc.).
 * - Collapses multiple separators into a single hyphen.
 * - Preserves numeric sequences within tokens (e.g. `Field 123` -> `field-123`).
 * - Result is all-lowercase.
 *
 * @module chainPrompt
 */

/**
 * Convert a string to kebab-case.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The kebab-cased string. Returns `''` for `''` input.
 * @throws {TypeError} If `str` is `null`, `undefined`, not a string, or contains only whitespace.
 *
 * @example
 * toKebabCase('first name'); // => 'first-name'
 * @example
 * toKebabCase('user_id'); // => 'user-id'
 * @example
 * toKebabCase('mobileNumber'); // => 'mobile-number'
 */
function toKebabCase(str) {
  if (str === null || str === undefined) {
    throw new TypeError('toKebabCase expects a string, received null or undefined');
  }
  if (typeof str !== 'string') {
    throw new TypeError(`toKebabCase expects a string, received ${typeof str}`);
  }

  // Empty string returns empty
  if (str === '') return '';

  // Strings containing only whitespace should throw
  if (str.trim() === '') {
    throw new TypeError('toKebabCase expects a non-whitespace string');
  }

  // Normalize boundaries: insert hyphen between lower/number and upper (camel/Pascal)
  // Replace any non-alphanumeric characters with hyphen, collapse multiple hyphens,
  // trim leading/trailing hyphens, and lowercase.
  const normalized = str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return normalized;
}

// Examples when run directly
if (require && require.main === module) {
  const examples = [
    ['first name', 'first-name'],
    ['user_id', 'user-id'],
    ['mobileNumber', 'mobile-number'],
    ['ScreenName', 'screen-name'],
    ['FIELD 123 VALUE', 'field-123-value'],
    ['', '']
  ];

  console.log('kebab-case Examples:');
  examples.forEach(([input, expected]) => {
    try {
      const out = toKebabCase(input);
      console.log(`  toKebabCase(${JSON.stringify(input)}) -> ${JSON.stringify(out)}  (expected: ${JSON.stringify(expected)})`);
    } catch (err) {
      console.log(`  toKebabCase(${JSON.stringify(input)}) -> threw ${err}`);
    }
  });

  // Demonstrate whitespace-only throws
  try {
    toKebabCase('   ');
  } catch (err) {
    console.log(`  toKebabCase('   ') -> throws: ${err.message}`);
  }
}

module.exports = toKebabCase;

/**
 * Utilities for converting strings into common case formats.
 *
 * This module provides two helpers:
 * - `toCamelCase(str)` — converts input to lower camelCase (e.g. "first name" -> "firstName").
 * - `dotCase(str)` — converts input to dot.case (e.g. "First Name" -> "first.name").
 *
 * Validation rules (applies to both functions):
 * - Throws `TypeError` if input is `null`, `undefined`, or not a string.
 * - Returns `''` for an empty string input.
 * - Throws `TypeError` for strings that contain only whitespace.
 * - Treats non-alphanumeric characters (spaces, punctuation, hyphens, underscores, dots, etc.) as separators.
 * - Preserves numeric sequences inside tokens (e.g. "field 123 value" -> `field123Value` / `field.123.value`).
 *
 * @module stringCaseUtils
 */
/**
 * Convert a string to lower camelCase (first word lowercase, subsequent words capitalized).
 *
 * Behavior:
 * - Splits words on any non-alphanumeric character and on camel/Pascal case boundaries.
 * - Collapses multiple separators into single word boundaries.
 * - Converts the first token to all-lowercase and capitalizes leading letters of subsequent tokens.
 * - Preserves digits within tokens.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted lower camelCase string. Returns an empty string when `str === ''`.
 * @throws {TypeError} If `str` is `null`, `undefined`, not a `string`, or consists only of whitespace.
 *
 * @example
 * toCamelCase('first name'); // => 'firstName'
 * @example
 * toCamelCase('user_id'); // => 'userId'
 * @example
 * toCamelCase('SCREEN_NAME'); // => 'screenName'
 */
function toCamelCase(str) {
  if (str === null || str === undefined) {
    throw new TypeError('toCamelCase expects a string, received null or undefined');
  }
  if (typeof str !== 'string') {
    throw new TypeError(`toCamelCase expects a string, received ${typeof str}`);
  }

  // Empty string is explicitly allowed and returns empty string
  if (str === '') return '';

  // Strings that are only whitespace should throw
  if (str.trim() === '') {
    throw new TypeError('toCamelCase expects a non-whitespace string');
  }

  // Normalize: split camel/Pascal boundaries, replace non-alphanumerics with space, trim
  const normalized = str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim();

  if (normalized === '') return '';

  const parts = normalized.split(/\s+/);
  const first = parts[0].toLowerCase();
  const rest = parts.slice(1).map(p => {
    const lower = p.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join('');

  return first + rest;
}

// Examples
if (require && require.main === module) {
  const examples = [
    ['first name', 'firstName'],
    ['user_id', 'userId'],
    ['SCREEN_NAME', 'screenName'],
    ['mobile-number', 'mobileNumber'],
    ['', ''], // empty string returns empty
  ];

  console.log('Examples:');
  examples.forEach(([input, expected]) => {
    try {
      const out = toCamelCase(input);
      console.log(`  toCamelCase(${JSON.stringify(input)}) -> ${JSON.stringify(out)}  (expected: ${JSON.stringify(expected)})`);
    } catch (err) {
      console.log(`  toCamelCase(${JSON.stringify(input)}) -> threw ${err}`);
    }
  });

  // Demonstrate whitespace-only throws
  try {
    toCamelCase('   ');
  } catch (err) {
    console.log(`  toCamelCase('   ') -> throws: ${err.message}`);
  }
}

/**
 * Convert a string to dot.case (lowercase, separated by dots).
 *
 * Behavior:
 * - Splits words on any non-alphanumeric character and on camel/Pascal case boundaries.
 * - Replaces separators with a single dot and collapses consecutive dots.
 * - Trims leading and trailing separators and lowercases the final string.
 * - Preserves numeric sequences as their own dot-separated tokens.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted dot.case string. Returns an empty string when `str === ''`.
 * @throws {TypeError} If `str` is `null`, `undefined`, not a `string`, or consists only of whitespace.
 *
 * @example
 * dotCase('First Name'); // => 'first.name'
 * @example
 * dotCase('user_id'); // => 'user.id'
 * @example
 * dotCase('Field 123 Value'); // => 'field.123.value'
 */
function dotCase(str) {
  if (str === null || str === undefined) {
    throw new TypeError('dotCase expects a string, received null or undefined');
  }
  if (typeof str !== 'string') {
    throw new TypeError(`dotCase expects a string, received ${typeof str}`);
  }

  if (str === '') return '';
  if (str.trim() === '') {
    throw new TypeError('dotCase expects a non-whitespace string');
  }

  // Normalize: split camel/Pascal boundaries with a dot, replace non-alphanumerics with dot,
  // collapse multiple dots, trim leading/trailing dots, then lowercase.
  const normalized = str
    .replace(/([a-z0-9])([A-Z])/g, '$1.$2')
    .replace(/[^A-Za-z0-9]+/g, '.')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .toLowerCase();

  return normalized;
}

// Dot.case examples (runs when file executed directly)
if (require && require.main === module) {
  const dotExamples = [
    ['First Name', 'first.name'],
    ['user_id', 'user.id'],
    ['SCREEN_NAME', 'screen.name'],
    ['mobile-number', 'mobile.number'],
    ['Field 123 Value', 'field.123.value']
  ];

  console.log('\nDot.case Examples:');
  dotExamples.forEach(([input, expected]) => {
    try {
      const out = dotCase(input);
      console.log(`  dotCase(${JSON.stringify(input)}) -> ${JSON.stringify(out)}  (expected: ${JSON.stringify(expected)})`);
    } catch (err) {
      console.log(`  dotCase(${JSON.stringify(input)}) -> threw ${err}`);
    }
  });

  try {
    dotCase('   ');
  } catch (err) {
    console.log(`  dotCase('   ') -> throws: ${err.message}`);
  }
}

module.exports = { toCamelCase, dotCase };

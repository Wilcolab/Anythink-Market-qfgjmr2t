/*
Prompt: Write a JavaScript function named `toCamelCase` that converts arbitrary input
into lower camelCase (first word lowercase, subsequent words capitalized).

Requirements:
- Accepts a single string argument and returns a string.
- Treat `null`/`undefined` or non-strings as invalid (throw a `TypeError`).
- Treat any non-alphanumeric character (spaces, punctuation, dashes, underscores, dots, etc.)
  as a separator between words.
- Preserve numbers inside words and treat them as part of tokens (e.g. `field 123` -> `field123`).
- Handle existing camelCase and PascalCase correctly (e.g. `HelloWorld` -> `helloWorld`).
- Collapse multiple separators into a single boundary and trim leading/trailing separators.
- Return an empty string when given `''`; throw for strings that are only whitespace.

Example:
```
toCamelCase('first name') // => 'firstName'
toCamelCase('user_id')    // => 'userId'
```

Ask for a short, well-documented implementation and a few unit-test examples.
*/

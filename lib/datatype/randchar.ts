/**
 * @function randchar
 * @summary Generates a random alphanumeric string.
 * @description Generates a random string of specified length using the provided character set. If no character set is provided, the default set includes uppercase and lowercase letters and digits.
 *
 * @param n The number of characters to generate. Defaults to 6 if not provided.
 * @param strset The character set to use for generating the random string.
 * @returns A randomly generated string of length `n`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Generate a random string of 12 characters from a custom set
 * const result1 = randchar(12, 'ABCD!-|/%&$1234567890');
 * assertEquals(result1.length, 12);
 * assertEquals(result1.split('').every(char => 'ABCD!-|/%&$1234567890'.includes(char)), true);
 *
 * // Example 2: Generate a random string of 16 characters from a different custom set
 * const result2 = randchar(16, 'ABCDEFGHILMNOPQRSTUVZ-1234567890');
 * assertEquals(result2.length, 16);
 * assertEquals(result2.split('').every(char => 'ABCDEFGHILMNOPQRSTUVZ-1234567890'.includes(char)), true);
 *
 * // Example 3: Generate a random string of 8 characters using the default set
 * const result3 = randchar(8);
 * assertEquals(result3.length, 8);
 * ``` */
export default function randchar(
  n = 6,
  strset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  return [...Array(n)].map(() =>
    strset[Math.floor(Math.random() * strset.length)]
  ).join("");
}

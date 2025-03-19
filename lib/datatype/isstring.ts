/**
 * @function isstring
 * @summary Checks if the input is a string.
 * @description Returns `true` if the input is of type string, otherwise returns `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is a string, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Input is a string
 * assertEquals(isstring('test'), true);
 *
 * // Example 2: Input is a number
 * assertEquals(isstring(123), false);
 *
 * // Example 3: Input is an object
 * assertEquals(isstring({ key: 'value' }), false);
 * ``` */
export default function isstring(x: unknown): x is string {
  return typeof x === "string";
}

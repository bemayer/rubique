import { array } from "../types.d.ts";

/**
 * @function isarray
 * @summary Checks if the input is a 1D array of numbers.
 * @description Returns `true` if the input is a 1D array and all its elements are numbers.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a 1D array of numbers, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: A valid 1D array of numbers
 * assertEquals(isarray([1.4, 2.3, 3]), true);
 *
 * // Example 2: An array with mixed types
 * assertEquals(isarray([1, "a", {}]), true);
 *
 * // Example 3: An empty array
 * assertEquals(isarray([]), true);
 *
 * // Example 4: Not an array (single number)
 * assertEquals(isarray(123), false);
 *
 * // Example 5: A 2D array (array of arrays)
 * assertEquals(isarray([[1], [2], [3]]), false);
 * ```
 */
// deno-lint-ignore no-explicit-any
export default function isarray(x: unknown): x is array<any> {
  return Array.isArray(x) && x.every((el) => !Array.isArray(el));
}

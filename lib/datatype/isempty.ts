import { array, matrix } from "../types.d.ts";
import isarray from "./isarray.ts";
import ismatrix from "./ismatrix.ts";

/**
 * @function isempty
 * @summary Checks if an array or matrix is empty.
 * @description Returns `true` if the input is an empty array or an empty matrix.
 *
 * @param x The input array or matrix to check.
 * @returns Returns `true` if `x` is empty, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: An empty array
 * assertEquals(isempty([]), true);
 *
 * // Example 2: A 2D array with an empty first row (considered empty matrix)
 * assertEquals(isempty([[]]), true);
 *
 * // Example 3: A non-empty 1D array
 * assertEquals(isempty([1, 2, 3]), false);
 *
 * // Example 4: A non-empty 2D array
 * assertEquals(isempty([[1, 2], [3, 4]]), false);
 *
 * // Example 5: A non-array input
 * assertEquals(isempty(123), false);
 * ```
 */
export default function isempty(x: unknown): boolean {
  return (isarray(x) && (x as array).length === 0) ||
    (ismatrix(x) && (x as matrix)[0].length === 0);
}

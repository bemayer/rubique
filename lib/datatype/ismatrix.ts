import type { matrix } from "../types.d.ts";
import isarray from "./isarray.ts";

/**
 * @function ismatrix
 * @summary True for matrix (2D array with consistent row lengths)
 * @description Returns `true` if the input is a 2D array (array of arrays) where all subarrays have the same length.
 *
 * @param {unknown} x The input to check.
 * @returns {boolean} Returns `true` if `x` is a valid matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Valid matrix with one row
 * assertEquals(ismatrix([[1, 3, 4]]), true);
 *
 * // Example 2: Valid matrix with multiple rows
 * assertEquals(ismatrix([[1], [3], [4]]), true);
 *
 * // Example 3: Invalid matrix due to varying row lengths
 * assertEquals(ismatrix([[1, 2], [3, 4, 5]]), false);
 *
 * // Example 4: Valid matrix with mixed element types
 * assertEquals(ismatrix([[1, 2], [3, '4']]), true);
 *
 * // Example 5: Empty array (not a matrix)
 * assertEquals(ismatrix([]), false);
 *
 * // Example 6: Empty matrix with one empty row
 * assertEquals(ismatrix([[]]), true);
 * ```
 */
export default function ismatrix(x: unknown): x is matrix<any> {
  return Array.isArray(x) && x.length > 0 &&
    x.every((row) => isarray(row) && row.length === x[0].length);
}

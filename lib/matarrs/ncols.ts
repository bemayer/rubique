import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import size from "./size.ts";

/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function ncols
 * @summary Returns the number of columns in an array or matrix.
 * @description Returns the number of columns in a 1D array (treated as a row vector) or a 2D matrix.
 *
 * @param {array|matrix} x - Array or matrix of elements.
 * @returns {number} - The number of columns in the input.
 *
 * @throws {Error} - Throws an error if no input is provided or if the input is not an array.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Row vector
 * assertEquals(ncols([5, 6, 7]), 3); // 3
 *
 * // Example 2: Matrix with multiple rows
 * assertEquals(ncols([[3, 2, 7], [4, 5, 6]]), 3); // 3
 *
 * // Example 3: Single element array
 * assertEquals(ncols([5]), 1); // 1
 *
 * // Example 4: Single element matrix (1x1)
 * assertEquals(ncols([[5]]), 1); // 1
 *
 * // Example 5: Empty array (treated as 1D)
 * assertEquals(ncols([]), 0); // 0
 *
 * // Example 6: Empty matrix (array of empty arrays)
 * assertEquals(ncols([[]]), 0); // 0
 *
 * // Example 7: Non-array input (should throw an error)
 * assert.throws(() => { ncols(5) }, Error, 'Input must be an array or matrix');
 *
 * // Example 8: 2D matrix with a single row
 * assertEquals(ncols([[1, 2, 3, 4]]), 4); // 4
 *
 * // Example 9: 2D matrix with varying row lengths (should throw an error)
 * assert.throws(() => { ncols([[1, 2], [3, 4, 5]]) }, Error, 'All rows in the matrix must have the same length');
 *
 * // Example 10: Multi-dimensional array (should be treated as a 2D matrix)
 * assertEquals(ncols([[1, 2], [3, 4]]), 2); // 2

 * ```*/
export default function ncols(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!(isarray(x) || ismatrix(x))) {
    throw new Error("Input must be an array or matrix");
  }

  return size(x)[1];
}

/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function transpose
 * @summary Transpose a matrix or array.
 * @description Transposes the given matrix or array. If the input is a 1D array, it is treated as a row vector and the result is a column vector. If the input is a matrix, the rows and columns are swapped.
 *
 * @param {array|matrix} x The input array or matrix to transpose.
 * @returns {matrix} The transposed matrix.
 *
 * @throws {Error} Throws an error if no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Transpose a 2x3 matrix
 * assert.deepStrictEqual(transpose([[5, 6, 5], [7, 8, -1]]), [[5, 7], [6, 8], [5, -1]]);
 *
 * // Example 2: Transpose a 1D array (row vector)
 * assert.deepStrictEqual(transpose([5, 6, 3]), [[5], [6], [3]]);
 *
 * // Example 3: Transpose a single number (scalar)
 * assertEquals(transpose(5), 5);
 *
 * // Example 4: Transpose a square matrix
 * assert.deepStrictEqual(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);

 * ```*/
export default function transpose(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (typeof x === "number") {
    return x;
  }

  // If input is a 1D array, treat it as a row vector and transpose to a column vector
  if (Array.isArray(x) && !Array.isArray(x[0])) {
    return x.map((value) => [value]);
  }

  // Transpose a 2D matrix by swapping rows and columns
  return x[0].map((_: any, colIndex: any) =>
    x.map((row: any) => row[colIndex])
  );
}

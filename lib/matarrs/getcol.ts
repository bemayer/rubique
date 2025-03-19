/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function getcol
 * @summary Get a column of a matrix.
 * @description Retrieves a specific column from a 2D matrix. If the input is not a matrix or if the column index is invalid, an error is thrown.
 *
 * @param {matrix} x The input matrix (2D array) from which to retrieve the column.
 * @param {number} n The column index to retrieve (0-based index).
 * @returns {array} An array representing the specified column of the matrix.
 *
 * @throws {Error} Throws an error if the input is not a matrix or if the column index is out of bounds.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Get the first column
 * assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 0), [5, 7]);
 *
 * // Example 2: Get the third column
 * assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 2), [5, -1]);
 *
 * // Example 3: Invalid column index (out of bounds)
 * assert.throws(() => { getcol([[5, 6, 5], [7, 8, -1]], 3); }, Error, 'Column index must be an integer between 0 and N - 1 columns');

 * ```*/
export default function getcol(x: any, n: any) {
  if (!x || n === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x) || !Array.isArray(x[0])) {
    throw new Error("Input must be a matrix (2D array)");
  }

  const numCols = x[0].length;

  if (!Number.isInteger(n) || n < 0 || n >= numCols) {
    throw new Error(
      "Column index must be an integer between 0 and N - 1 columns",
    );
  }

  return x.map((row) => row[n]);
}

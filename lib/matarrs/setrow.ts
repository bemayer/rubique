/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function setrow
 * @summary Set a row of a matrix.
 * @description Replaces the values of row `n` in a matrix with a given row vector.
 *
 * @param {array|vector} x Row vector (1xN) to insert.
 * @param {matrix} mat Matrix (MxN) in which to set the row.
 * @param {number} n Row index (0-based).
 * @returns {matrix} A new matrix with the updated row.
 * @throws {Error} If inputs are invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Replace the first row of a matrix
 * assert.deepStrictEqual(setrow([2, 0, -2], [[5, 6, 5], [7, 8, -1]], 0), [
 *   [2, 0, -2],
 *   [7, 8, -1]
 * ]);
 *
 * // Example 2: Replace the second row of a matrix
 * assert.deepStrictEqual(setrow([9, 21, 57], [[5, 6, 5], [7, 8, -1]], 1), [
 *   [5, 6, 5],
 *   [9, 21, 57]
 * ]);
 *
 * // Example 3: Row vector length mismatch error
 * assert.throws(() => setrow([1, 2], [[4, 5, 6], [7, 8, 9]], 1), /Row vector length must match the number of matrix columns./);
 *
 * // Example 4: Row index out of bounds error
 * assert.throws(() => setrow([1, 2, 3], [[4, 5, 6], [7, 8, 9]], 2), /Row index must be an integer between 0 and M-1./);
 *
 * // Example 5: Invalid matrix error
 * assert.throws(() => setrow([1, 2, 3], "not a matrix", 0), /Input matrix must be a 2D array./);
 *
 * // Example 6: Invalid row vector error
 * assert.throws(() => setrow("not a vector", [[4, 5, 6], [7, 8, 9]], 1), /Row vector must be an array./);

 * ```*/
export default function setrow(x: any, mat: any, n: any) {
  if (!Array.isArray(mat) || !Array.isArray(mat[0])) {
    throw new Error("Input matrix must be a 2D array.");
  }
  if (!Array.isArray(x)) {
    throw new Error("Row vector must be an array.");
  }
  if (!Number.isInteger(n) || n < 0 || n >= mat.length) {
    throw new Error("Row index must be an integer between 0 and M-1.");
  }

  const rowVector = toRowVector(x);
  if (rowVector.length !== mat[0].length) {
    throw new Error(
      "Row vector length must match the number of matrix columns.",
    );
  }

  return mat.map((row, i) => (i === n ? rowVector : row));
}

function toRowVector(x: any) {
  if (!Array.isArray(x)) {
    throw new Error("Input must be an array.");
  }
  return Array.isArray(x[0]) ? x.flat() : x;
}

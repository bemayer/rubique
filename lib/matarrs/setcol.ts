/** @import { array, matrix } from '../types.d.ts' */

import ismatrix from "../datatype/ismatrix.ts";
import isarray from "../datatype/isarray.ts";
import isinteger from "../datatype/isinteger.ts";
import ncols from "./ncols.ts";
import transpose from "./transpose.ts";

/**
 * @function setcol
 * @summary Set a column of a matrix.
 * @description Replaces the values of column `n` in a matrix with a given column vector.
 *
 * @param {array|vector} x Column vector (Mx1) to insert.
 * @param {matrix} mat Matrix (MxN) in which to set the column.
 * @param {number} n Column index (0-based).
 * @returns {matrix} A new matrix with the updated column.
 * @throws {Error} If inputs are invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Replace the first column of a matrix
 * assert.deepStrictEqual(setcol([2, 0], [[5, 6, 5], [7, 8, -1]], 0), [
 *   [2, 6, 5],
 *   [0, 8, -1]
 * ]);
 *
 * // Example 2: Replace the third column of a matrix
 * assert.deepStrictEqual(setcol([9, 21], [[5, 6, 5], [7, 8, -1]], 2), [
 *   [5, 6, 9],
 *   [7, 8, 21]
 * ]);
 *
 * // Example 3: Column vector length mismatch error
 * assert.throws(() => setcol([1, 2, 3], [[4, 5], [6, 7]], 1), /Column vector length must match the number of matrix rows./);
 *
 * // Example 4: Column index out of bounds error
 * assert.throws(() => setcol([1, 2], [[4, 5], [6, 7]], 2), /Column index must be an integer between 0 and N-1./);
 *
 * // Example 5: Invalid matrix error
 * assert.throws(() => setcol([1, 2], "not a matrix", 1), /Input matrix must be a 2D array./);
 *
 * // Example 6: Invalid column vector error
 * assert.throws(() => setcol("not a vector", [[4, 5], [6, 7]], 1), /Column vector must be an array./);

 * ```*/
export default function setcol(x: any, mat: any, n: any) {
  if (!ismatrix(mat)) {
    throw new Error("Input matrix must be a 2D array.");
  }
  if (!isarray(x)) {
    throw new Error("Column vector must be an array.");
  }
  if (!isinteger(n) || n < 0 || n >= ncols(mat)) {
    throw new Error("Column index must be an integer between 0 and N-1.");
  }

  const x_t = transpose(x);

  if (x_t.length !== mat.length) {
    throw new Error(
      "Column vector length must match the number of matrix rows.",
    );
  }

  return mat.map((row: any, i: any) =>
    row.map((val: any, j: any) => (j === n ? x_t[i][0] : val))
  );
}

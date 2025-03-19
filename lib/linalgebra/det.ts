/** @import { matrix } from '../types.d.ts' */
import isnumber from "../datatype/isnumber.ts";
import isvector from "../datatype/isvector.ts";
import issquare from "../matarrs/issquare.ts";
import lu from "../linalgebra/lu.ts";
import ncols from "../matarrs/ncols.ts";

/**
 * @function det
 * @summary Matrix determinant
 * @description Computes the determinant of a square matrix using LU decomposition.
 *
 * @param {matrix} x A square matrix.
 * @returns {number} The determinant of the matrix.
 * @throws {Error} If no input is provided, or if the input is not a square matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Determinant of a 2x2 matrix
 * assertEquals(det([[1, 5], [6, 2]]), -28);
 *
 * // Example 2: Determinant of another 2x2 matrix
 * assertEquals(det([[2, 2], [2, 3]]), 2);
 *
 * // Example 3: Determinant of a 3x3 matrix
 * assertEquals(det([[1, 2, 3], [0, 4, 5], [1, 0, 6]]), 22);
 *
 * // Example 4: Determinant of a 3x3 matrix with zeros
 * assertEquals(det([[0, 2, 3], [0, 4, 5], [1, 0, 6]]), -2);
 *
 * // Example 5: Determinant of an identity matrix
 * assertEquals(det([[1, 0], [0, 1]]), 1);
 *
 * // Example 6: Determinant of a 4x4 matrix (should be 0 due to linear dependence)
 * assertEquals(det([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]), 0);
 *
 * // Example 7: Determinant of a larger matrix
 * assertEquals(det([[4, 8, 2], [4, 6, 8], [4, 2, 8]]), 96);
 *
 * // Example 8: Determinant of a matrix with fractional values
 * assertEquals(det([[-40.54, 34.02], [91.81, 57.47]]), -5453.21);

 * ```*/
export default function det(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x) || isvector(x)) {
    throw new Error("Input must be a matrix");
  }

  if (!issquare(x)) {
    throw new Error("Matrix must be square");
  }

  const { LU, S } = lu(x);
  const n = ncols(x);
  let determinant = S;

  for (let i = 0; i < n; i++) {
    determinant *= LU[i][i];
  }

  return Object.is(determinant, -0) ? 0 : determinant;
}

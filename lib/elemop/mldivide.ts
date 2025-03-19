/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import issquare from "../matarrs/issquare.ts";
import inv from "../linalgebra/inv.ts";
import ldivide from "./ldivide.ts";
import mtimes from "./mtimes.ts";
import ncols from "../matarrs/ncols.ts";
import nrows from "../matarrs/nrows.ts";

/**
 * @function mldivide
 * @summary Matrix division X \ Y
 * @description Matrix division X \ Y. If X is NxN and Y is NxM, then returns a matrix NxM. Y is multiplied by the inverse of X. X must be square.
 *
 * @param {number|array|matrix} y The left matrix or scalar (denominator).
 * @param {number|array|matrix} x The right matrix or scalar (numerator).
 * @returns {number|array|matrix} The result of the division.
 * @throws {Error} If insufficient arguments are provided or if the matrix dimensions do not match.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Divide two scalars
 * assertEquals(mldivide(5, 6), 6 / 5);
 *
 * // Example 2: Matrix left division
 * assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.047619, 0.380952], [-1.285714, -0.285714]]);
 *
 * // Example 3: Scalar left divides a matrix
 * assert.deepStrictEqual(mldivide(5, [[9, 5], [6, 1]]), [[9 / 5, 5 / 5], [6 / 5, 1 / 5]]);
 *
 * // Example 4: Matrix left division with non-square matrix
 * assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[5, 6, 5], [7, 8, -1]]), [[1.428571, 1.619048, -0.47619], [-1.571429, -1.714286, 1.857143]]);

 * ```*/
export default function mldivide(y: any, x: any) {
  if (y === undefined || x === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x) && isnumber(y)) {
    return x / y;
  }

  if (isnumber(y)) {
    return ldivide(y, x);
  }

  if (issquare(y)) {
    if (ncols(y) !== nrows(x)) throw new Error("Matrix dimensions mismatch");
    return mtimes(inv(y), x);
  }
}

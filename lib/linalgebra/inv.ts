/** @import { array, matrix } from '../types.d.ts' */

import issquare from "../matarrs/issquare.ts";
import isnumber from "../datatype/isnumber.ts";
import nrows from "../matarrs/nrows.ts";
import linsolve from "./linsolve.ts";
import eye from "../matarrs/eye.ts";

/**
 * @function inv
 * @summary Computes the inverse of a square matrix.
 * @description Returns the inverse of a square matrix. If the input is a single number, it returns the reciprocal of that number.
 *
 * @param {number|array|matrix} x A square matrix or a number.
 * @returns {number|array|matrix} The inverse of the matrix or the reciprocal of the number.
 * @throws {Error} If no arguments are provided or if the input is not a square matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Inverse of a 2x2 matrix
 * assert.deepStrictEqual(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
 *
 * // Example 2: Inverse of a 3x3 matrix
 * assert.deepStrictEqual(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
 *  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
 * ]);
 *
 * // Example 3: Inverse of a number
 * assertEquals(inv(4), 0.25);
 *
 * // Example 4: Error when input is not square matrix
 * assert.throws(() => inv([[1, 2]]), Error, 'matrix must be square');
 *
 * // Example 5: Error when no arguments are provided
 * assert.throws(() => inv(), Error, 'not enough input arguments');

 * ```*/
export default function inv(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(x)) {
    return 1 / x;
  }

  if (!issquare(x)) {
    throw new Error("matrix must be square");
  }

  const m = nrows(x);
  // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
  const I = eye(m);
  return linsolve(x, I);
}

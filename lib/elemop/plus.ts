/** @import { array, matrix } from '../types.d.ts' */

import arrayfun from "../datatype/arrayfun.ts";
import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * @function plus
 * @summary Addition X + Y
 * @description Adds two numbers, arrays, or matrices element-wise. Handles mixed inputs of scalars, arrays, and matrices.
 *
 * @param {number|array|matrix} x The first operand, can be a number, array, or matrix.
 * @param {number|array|matrix} y The second operand, can be a number, array, or matrix.
 * @returns {number|array|matrix} The result of adding `x` and `y`.
 * @throws {Error} If the input dimensions do not agree or if no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Add two numbers
 * assertEquals(plus(5, 6), 11);
 *
 * // Example 2: Add two arrays element-wise
 * assert.deepStrictEqual(plus([5, 6, 4], [3, -1, 0]), [8, 5, 4]);
 *
 * // Example 3: Add a number to each element of an array
 * assert.deepStrictEqual(plus([5, 6, 4], 10), [15, 16, 14]);
 *
 * // Example 4: Add two matrices element-wise
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(plus(a, b), [[4, 9, 4], [11, 13, 8]]);
 *
 * // Example 5: Add a number to each element of a matrix
 * assert.deepStrictEqual(plus([[1, 2], [3, 4]], 2), [[3, 4], [5, 6]]);

 * ```*/
export default function plus(x: any, y: any) {
  if (arguments.length < 2) throw new Error("Not enough input arguments");

  if (isnumber(x) && isnumber(y)) {
    return x + y;
  }

  if (isnumber(x)) {
    return arrayfun(y, (val: any) => x + val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: any) => val + y);
  }

  if (isarray(x) && isarray(y)) {
    if (x.length !== y.length) throw new Error("Input dimensions must agree");
    return x.map((val: any, idx: any) => val + y[idx]);
  }

  if (ismatrix(x) && ismatrix(y)) {
    if (x.length !== y.length || x[0].length !== y[0].length) {
      throw new Error("Input dimensions must agree");
    }
    return x.map((row: any, i: any) =>
      row.map((val: any, j: any) => val + y[i][j])
    );
  }

  throw new Error("Invalid input types");
}

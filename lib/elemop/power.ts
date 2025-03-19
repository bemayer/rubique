/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function power
 * @summary Element-wise power X ^ Y
 * @description Computes the element-wise power of `x` raised to `y`. Supports mixed inputs of scalars, arrays, and matrices.
 *
 * @param {number|array|matrix} x The base value, can be a number, array, or matrix.
 * @param {number|array|matrix} y The exponent value, can be a number, array, or matrix.
 * @returns {number|array|matrix} The result of raising `x` to the power of `y`.
 * @throws {Error} If the input dimensions do not agree or if insufficient arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Power of two numbers
 * assertEquals(power(5, 4), 625);
 *
 * // Example 2: Power of an array by a scalar
 * assert.deepStrictEqual(power([5, 6, 3], 5), [3125, 7776, 243]);
 *
 * // Example 3: Scalar raised to the power of an array
 * assert.deepStrictEqual(power(5, [5, 6, 3]), [3125, 15625, 125]);
 *
 * // Example 4: Element-wise power of two arrays
 * assert.deepStrictEqual(power([5, 6, 3], [0.5, -3, 2.3]), [2.23607, 0.00462963, 12.5135]);
 *
 * // Example 5: Power of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(power(a, b), [[0.2, 216, 0.2], [2401, 32768, -1]]);
 *
 * // Example 6: Scalar raised to the power of a matrix
 * assert.deepStrictEqual(power(5, a), [[3125, 15625, 3125], [78125, 390625, 0.2]]);

 * ```*/
export default function power(x: any, y: any) {
  if (arguments.length < 2) throw new Error("Not enough input arguments");

  const applyPower = (a: any, b: any) => Math.pow(a, b);

  if (isnumber(x) && isnumber(y)) {
    return applyPower(x, y);
  }

  if (isnumber(x)) {
    return arrayfun(y, (val: any) => applyPower(x, val));
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: any) => applyPower(val, y));
  }

  if (isarray(x) && isarray(y)) {
    if (x.length !== y.length) throw new Error("Input dimensions must agree");
    return x.map((val: any, idx: any) => applyPower(val, y[idx]));
  }

  if (ismatrix(x) && ismatrix(y)) {
    if (x.length !== y.length || x[0].length !== y[0].length) {
      throw new Error("Input dimensions must agree");
    }
    return x.map((row: any, i: any) =>
      row.map((val: any, j: any) => applyPower(val, y[i][j]))
    );
  }

  throw new Error("Invalid input types");
}

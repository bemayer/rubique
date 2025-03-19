/** @import { array, matrix } from '../types.d.ts' */

import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function round
 * @summary Round to nearest integer
 * @description Rounds each element in `x` to the nearest integer or specified number of decimal places. Handles numbers, arrays, and matrices element-wise.
 *
 * @param {number|array|matrix} x The value(s) to be rounded.
 * @param {number} [n=0] The number of decimal places to round to (default is 0).
 * @returns {number|array|matrix} The rounded value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Round a number to 12 decimal places
 * assertEquals(round(Math.PI, 12), 3.14159265359);
 *
 * // Example 2: Round an array of numbers to 2 decimal places
 * assert.deepStrictEqual(round([-1.4543, 4.5234], 2), [-1.45, 4.52]);
 *
 * // Example 3: Round an array of numbers to the nearest integer
 * assert.deepStrictEqual(round([-1.9, -0.2, 3.4, 5.6, 7.0]), [-2, 0, 3, 6, 7]);
 *
 * // Example 4: Round a matrix of numbers to the nearest integer
 * assert.deepStrictEqual(round([[1.45, -2.3], [1.1, -4.3]]), [[1, -2], [1, -4]]);
 *
 * // Example 5: Round a matrix of numbers to 1 decimal place
 * assert.deepStrictEqual(round([[1.456, -2.354], [1.123, -4.345]], 1), [[1.5, -2.4], [1.1, -4.3]]);
 *
 * // Example 6: Round a single number without specifying decimal places
 * assertEquals(round(5.678), 6);
 *
 * // Example 7: Round an array of negative numbers to 2 decimal places
 * assert.deepStrictEqual(round([-1.4567, -4.5234], 2), [-1.46, -4.52]);
 *
 * // Example 8: Round a single negative number to 2 decimal places
 * assertEquals(round(-2.34567, 2), -2.35);

 * ```*/
export default function round(x: any, n = 0) {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const p = Math.pow(10, n);
  const _round = (a: any) => {
    const res = Math.round(a * p) / p;
    return res === 0 ? 0 : res;
  };

  return arrayfun(x, _round);
}

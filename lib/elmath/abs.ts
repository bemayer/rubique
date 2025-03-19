/** @import { array, matrix } from '../types.d.ts' */

import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function abs
 * @summary Absolute value
 * @description Returns the absolute value of a number, or applies the absolute value function element-wise to arrays or matrices.
 *
 * @param {number|array|matrix} x The number, array, or matrix to compute the absolute value for.
 * @return {number|array|matrix} The absolute value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the absolute value of a single number
 * assertEquals(abs(-0.5), 0.5);
 *
 * // Example 2: Compute the absolute value of an array of numbers
 * assert.deepStrictEqual(abs([0.1, -0.5]), [0.1, 0.5]);
 *
 * // Example 3: Compute the absolute value of a matrix
 * assert.deepStrictEqual(abs([[5, -2], [-3, 4]]), [[5, 2], [3, 4]]);

 * ```*/
export default function abs(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  return arrayfun(x, Math.abs);
}

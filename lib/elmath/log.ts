/** @import { array, matrix } from '../types.d.ts' */
import arrayfun from "../datatype/arrayfun.ts";
import isnumber from "../datatype/isnumber.ts";

/**
 * @function log
 * @summary Computes the natural logarithm (base e).
 * @description Computes the natural logarithm (base e) for each element in a number, array, or matrix.
 *
 * @param {number|array|matrix} x The input value(s).
 * @returns {number|array|matrix} The natural logarithm of the input value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Natural logarithm of a single number
 * assertEquals(log(6), 1.79176);
 *
 * // Example 2: Natural logarithm of an array of numbers
 * assert.deepStrictEqual(log([5, 6, 3]), [1.60944, 1.79176, 1.09861]);
 *
 * // Example 3: Natural logarithm of a matrix of numbers
 * assert.deepStrictEqual(log([[5, 6, 5], [7, 8, 2]]), [
 *   [1.60944, 1.79176, 1.60944],
 *   [1.94591, 2.07944, 0.69315]
 * ]);

 * ```*/
export default function log(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const computeLog = Math.log;

  return isnumber(x) ? computeLog(x) : arrayfun(x, computeLog);
}

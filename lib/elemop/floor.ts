/** @import { array, matrix } from '../types.d.ts' */

import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function floor
 * @summary Rounds a number or array of numbers toward negative infinity.
 * @description Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param {number|array|matrix} x Number or array of numbers to be rounded.
 * @param {number} [n=0] Number of decimal places to round to. Defaults to 0.
 * @returns {number|array|matrix} The rounded value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Round PI to 12 decimal places
 * assertEquals(floor(Math.PI, 12), 3.141592653589);
 *
 * // Example 2: Round a single number toward negative infinity
 * assertEquals(floor(3.78), 3);
 *
 * // Example 3: Round an array of numbers toward negative infinity
 * assert.deepStrictEqual(floor([4.51, -1.4]), [4, -2]);
 *
 * // Example 4: Round a matrix of numbers to 2 decimal places
 * assert.deepStrictEqual(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);

 * ```*/
export default function floor(x: any, n = 0) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const factor = Math.pow(10, n);

  return arrayfun(x, (a: any) => Math.floor(a * factor) / factor);
}

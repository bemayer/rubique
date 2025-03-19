/** @import { array, matrix } from '../types.d.ts' */

import arrayfun from "../datatype/arrayfun.ts";
import isnumber from "../datatype/isnumber.ts";

/**
 * @function sqrt
 * @summary Computes the square root of a number, array, or matrix.
 * @description Computes the square root of each element in a number, array, or matrix. Returns NaN for negative values.
 *
 * @param {number|array|matrix} x The input value(s).
 * @returns {number|array|matrix} The square root of the input value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Square root of a single number
 * assertEquals(sqrt(6), 2.44949);
 *
 * // Example 2: Square root of an array of numbers
 * assert.deepStrictEqual(sqrt([5, 6, 3]), [2.23607, 2.44949, 1.73205]);
 *
 * // Example 3: Square root of a matrix of numbers
 * assert.deepStrictEqual(sqrt([[5, 6, 5], [7, 8, 2]]), [[2.23607, 2.44949, 2.23607], [2.64575, 2.82843, 1.41421]]);

 * ```*/
export default function sqrt(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const computeSqrt = Math.sqrt;

  return isnumber(x) ? computeSqrt(x) : arrayfun(x, computeSqrt);
}

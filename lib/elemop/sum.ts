/** @import { array, matrix } from '../types.d.ts' */

import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function sum
 * @summary Sum of array elements
 * @description Computes the sum of array or matrix elements. If a matrix is provided, the sum can be calculated across rows or columns based on the specified dimension.
 *
 * @param {array|matrix} x The array or matrix of values.
 * @param {number} [dim=0] The dimension to sum across. Use `0` for rows and `1` for columns. Defaults to `0`.
 * @returns {number|array} The sum of the elements.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sum of elements in a 1D array
 * assertEquals(sum([5, 6, 3]), 14);
 *
 * // Example 2: Sum of elements across rows in a 2D array
 * assert.deepStrictEqual(sum([[5, 6, 5], [7, 8, -1]], 0), [[16], [14]]);
 *
 * // Example 3: Sum of elements across columns in a 2D array
 * assert.deepStrictEqual(sum([[5, 6, 5], [7, 8, -1]], 1), [[12, 14, 4]]);

 * ```*/
export default function sum(x: any, dim = 0) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  const _sum = (a: any) => a.reduce((acc: any, val: any) => acc + val, 0);

  return vectorfun(dim, x, _sum);
}

/** @import { array, matrix } from '../types.d.ts' */

import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function cumsum
 * @summary Cumulative sum of array elements
 * @description Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=1] The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns {array|matrix} The cumulative sum of the input values.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative sum of a 1D array
 * assert.deepStrictEqual(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * // Example 2: Cumulative sum of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cumsum([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [12, 14, 4]]);
 *
 * // Example 3: Cumulative sum of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);

 * ```*/
export default function cumsum(x: any, dim = 1) {
  if (!x) throw new Error("Not enough input arguments");

  return vectorfun(
    dim,
    x,
    (a: any) => a.map(((sum) => (value: any) => sum += value)(0)),
  );
}

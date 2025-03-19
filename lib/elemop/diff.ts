/** @import { array, matrix } from '../types.d.ts' */

import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function diff
 * @summary Differences between adjacent elements in an array or matrix
 * @description Computes the differences between adjacent elements in an array or along a specified dimension of a matrix.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=1] The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns {array|matrix} The differences between adjacent elements.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Differences in a 1D array
 * assert.deepStrictEqual(diff([5, 6, 3]), [1, -3]);
 *
 * // Example 2: Differences in a matrix along columns (dim=1)
 * assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1], [1, 2, 3]]), [[2, 2, -6]]);
 *
 * // Example 3: Differences in a matrix along rows (dim=0)
 * assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1]], 0), [[1, -1], [1, -9]]);

 * ```*/
export default function diff(x: any, dim = 1) {
  if (!x) throw new Error("Not enough input arguments");

  return vectorfun(
    dim,
    x,
    (a: any) => a.slice(1).map((val: any, i: any) => val - a[i]),
  );
}

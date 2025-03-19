/** @import { array, matrix } from '../types.d.ts' */

import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function cumprod
 * @summary Cumulative product of array elements
 * @description Computes the cumulative product of elements in an array or matrix along a specified dimension.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=1] The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns {array|matrix} The cumulative product of the input values.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative product of a 1D array
 * assert.deepStrictEqual(cumprod([5, 6, 3]), [5, 30, 90]);
 *
 * // Example 2: Cumulative product of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [35, 48, -5]]);
 *
 * // Example 3: Cumulative product of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]], 0), [[5, 30, 150], [7, 56, -56]]);

 * ```*/
export default function cumprod(x: any, dim = 1) {
  if (x === undefined) {
    throw new Error("Not enough input arguments");
  }

  return vectorfun(
    dim,
    x,
    (a: any) =>
      a.map((_: any, i: any) =>
        a.slice(0, i + 1).reduce((acc: any, val: any) => acc * val, 1)
      ),
  );
}

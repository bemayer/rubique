/** @import { array, matrix } from '../types.d.ts' */

import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function cummax
 * @summary Cumulative maximum of array elements
 * @description Computes the cumulative maximum of elements in an array or matrix along a specified dimension.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=1] The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns {array|matrix} The cumulative maximum of the input values.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative maximum of a 1D array
 * assert.deepStrictEqual(cummax([5, 6, 3]), [5, 6, 6]);
 *
 * // Example 2: Cumulative maximum of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [7, 8, 5]]);
 *
 * // Example 3: Cumulative maximum of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]], 0), [[5, 6, 6], [7, 8, 8]]);

 * ```*/
export default function cummax(x: any, dim = 1) {
  if (x === undefined) {
    throw new Error("Not enough input arguments");
  }

  return vectorfun(
    dim,
    x,
    (a: any) => a.map((_: any, i: any) => Math.max(...a.slice(0, i + 1))),
  );
}

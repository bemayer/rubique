/** @import { array, matrix } from '../types.d.ts' */

import cumsum from "./cumsum.ts";
import mean from "../stats/mean.ts";
import minus from "./minus.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function cumdev
 * @summary Cumulative mean deviation
 * @description Computes the cumulative mean deviation of an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The cumulative mean deviation.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative mean deviation of a 1D array
 * assertEquals(cumdev([5, 6, 3]), [0.333333, 1.666667, 0]);
 *
 * // Example 2: Cumulative mean deviation of a matrix along rows (dim=0)
 * assertEquals(cumdev([[-1, 3, -1], [4, 5, 9]], 0), [[-1.333333, 1.333333, 0], [-2, -3, 0]]);
 *
 * // Example 3: Cumulative mean deviation of a matrix along columns (dim=1)
 * assertEquals(cumdev([[-1, 3, -1], [4, 5, 9]]), [[-2.5, -1, -5], [0, 0, 0]]);
 * ```
 */
export default function cumdev(
  x: number[] | number[][],
  dim = 1,
): number[] | number[][] {
  const _cumdev = (a: number[]) => cumsum(minus(a, mean(a)));

  return vectorfun(dim, x, _cumdev);
}

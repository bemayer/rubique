import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber, mean, minus, vectorfun } from "../../index.ts";

/**
 * @function mad
 * @summary Mean absolute deviation
 * @description Calculates the mean absolute deviation of the values in array x
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the MAD. Default is 0 (rows)
 * @returns The mean absolute deviation value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { mad } from "../../index.ts";
 *
 * // Example 1: Calculate MAD of an array
 * const c = [5, 6, 3];
 * assertEquals(mad(c), 1.11111);
 *
 * // Example 2: Calculate MAD for each column of a matrix
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(mad(a, 1), [[1, 1, 3]]);
 *
 * // Example 3: Calculate MAD for each row of a matrix
 * assertEquals(mad(a), [[0.444444], [3.777778]]);
 * ```
 */
export default function mad(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _mad = function (a: number[]) {
    return mean(arrayfun(minus(a, mean(a)), Math.abs));
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _mad);
}

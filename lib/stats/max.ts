import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function max
 * @summary Largest element in array
 * @description Computes the largest element in an array or matrix
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the maximum. Default is 0 (rows)
 * @returns The maximum value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { max } from "../../index.ts";
 *
 * // Example 1: Find max in a 1D array
 * assertEquals(max([5, 6, -1]), 6);
 *
 * // Example 2: Find max in each row of a matrix (dim=0, default)
 * assertEquals(max([[-1, 3, -1], [4, 5, 9]]), [[3], [9]]);
 *
 * // Example 3: Find max in each column of a matrix (dim=1)
 * assertEquals(max([[-1, 3, -1], [4, 5, 9]], 1), [[4, 5, 9]]);
 * ```
 */
export default function max(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _max = function (a: number[]) {
    return Math.max.apply(null, a);
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _max);
}

import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function min
 * @summary Smallest element in array
 * @description Computes the smallest element in an array or matrix
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the minimum. Default is 0 (rows)
 * @returns The minimum value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { min } from "../../index.ts";
 *
 * // Example 1: Find min in a 1D array
 * assertEquals(min([5, 6, -1]), -1);
 *
 * // Example 2: Find min in each row of a matrix (dim=0, default)
 * assertEquals(min([[-1, 3, -1], [4, 5, 9]]), [[-1], [4]]);
 *
 * // Example 3: Find min in each column of a matrix (dim=1)
 * assertEquals(min([[-1, 3, -1], [4, 5, 9]], 1), [[-1, 3, -1]]);
 * ```
 */
export default function min(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _min = function (a: number[]) {
    return Math.min.apply(null, a);
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _min);
}

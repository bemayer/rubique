import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, max, min, vectorfun } from "../../index.ts";

/**
 * @function range
 * @summary Range of values
 * @description Calculates the range (max - min) of values in an array or matrix
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the range. Default is 0 (rows)
 * @returns The range value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { range } from "../../index.ts";
 *
 * // Example 1: Range of a 1D array
 * assertEquals(range([5, 6, 3]), 3);
 *
 * // Example 2: Range for each row of a matrix
 * assertEquals(range([[5, 6, 5], [7, 8, -1]]), [[1], [9]]);
 *
 * // Example 3: Range for each column of a matrix
 * assertEquals(range([[5, 6, 5], [7, 8, -1]], 1), [[2, 2, 6]]);
 * ```
 */
export default function range(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _range = function (a: number[]) {
    return (max(a) as number) - (min(a) as number);
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _range);
}

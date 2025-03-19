import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, max, sort, vectorfun } from "../../index.ts";

/**
 * @function median
 * @summary Median value of array
 * @description Computes the median value of array
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the median. Default is 0 (rows)
 * @returns The median value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { median } from "../../index.ts";
 *
 * // Example 1: Find median in a 1D array
 * assertEquals(median([5, 6, 3]), 5);
 *
 * // Example 2: Find median in each row of a matrix (dim=0, default)
 * assertEquals(median([[5, 6, 5], [7, 8, -1]]), [[5], [7]]);
 *
 * // Example 3: Find median in each column of a matrix (dim=1)
 * assertEquals(median([[5, 6, 5], [7, 8, -1]], 1), [[6, 7, 2]]);
 * ```
 */
export default function median(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _median = function (a: number[]) {
    const n = a.length - 1;
    const idx = max(1, Math.floor(n / 2)) as number;
    const _a = sort(a);

    if (n % 2 === 0) {
      return _a[idx];
    } else {
      return (_a[idx - 1] + _a[idx]) / 2;
    }
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _median);
}

import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, sort, vectorfun } from "../../index.ts";

/**
 * @function mode
 * @summary Most frequent value in an array of elements
 * @description Most frequent value in an array of elements (Unimodal)
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the mode. Default is 0 (rows)
 * @returns The mode value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { mode } from "../../index.ts";
 *
 * // Example 1: Find mode in a 1D array
 * assertEquals(mode([5, 6, 3, 5]), 5);
 *
 * // Example 2: Find mode in each row of a matrix (dim=0, default)
 * assertEquals(mode([[5, 6, 5], [7, 8, -1, -1]]), [[5], [-1]]);
 *
 * // Example 3: Find mode in each column of a matrix (dim=1)
 * assertEquals(mode([[5, 6, 5], [7, 8, -1]], 1), [[5, 6, -1]]);
 * ```
 */
export default function mode(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _mode = function (a: number[]) {
    const counter: Record<number, number> = {};
    let mode: number[] = [];
    let max = 0;
    const _a = sort(a);

    for (let i = 0; i < a.length; i++) {
      if (!(_a[i] in counter)) {
        counter[_a[i]] = 0;
      } else {
        counter[_a[i]]++;
      }

      if (counter[_a[i]] === max) {
        mode.push(_a[i]);
      } else if (counter[_a[i]] > max) {
        max = counter[_a[i]];
        mode = [_a[i]];
      }
    }

    return mode[0];
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _mode);
}

import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  colon,
  interp1,
  isnumber,
  rdivide,
  sort,
  times,
  vectorfun,
} from "../../index.ts";

/**
 * @function prctile
 * @summary Percentiles of a sample
 * @description Calculates the p-th percentile of the values in array x
 *
 * @param x The input array or matrix
 * @param p The p-th percentile in the range [0,100]
 * @param dim Optional dimension along which to compute percentiles. Default is 0 (rows)
 * @returns The percentile value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { prctile, cat } from "../../index.ts";
 *
 * // Example 1: Calculate the 5th percentile of an array
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(prctile(x, 5), -0.014);
 *
 * // Example 2: Calculate the 33rd percentile of an array
 * assertEquals(prctile(x, 33), 0.0118);
 *
 * // Example 3: Calculate the 5th percentile for each row in a matrix
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(prctile(cat(0, x, y), 5), [[-0.014, -0.061]]);
 * ```
 */
export default function prctile(
  x: numarraymatrix,
  p: number,
  dim: number = 0,
): numarraymatrix {
  if (p < 0 || p > 100) {
    throw new Error(
      "p-th percentile must be a real value between 0 and 100 inclusive",
    );
  }

  const _prctile = function (a: number[], pr: number) {
    const arrnum = colon(0.5, a.length - 0.5) as number[];
    const _a = sort(a) as number[];
    const pq = rdivide(times(arrnum, 100), a.length) as number[];

    // Concatenate values to the beginning and end
    const extendedPq = [0].concat(pq, [100]);
    const extendedA = [_a[0]].concat(_a, [_a[_a.length - 1]]);

    return interp1(extendedPq, extendedA, pr);
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _prctile, p);
}

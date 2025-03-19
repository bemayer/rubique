import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, prctile, vectorfun } from "../../index.ts";

/**
 * @function iqr
 * @summary Interquartile range
 * @description Calculates the interquartile range (Q3 - Q1 quartiles)
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute the IQR. Default is 0 (rows)
 * @returns The interquartile range value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { iqr, cat } from "../../index.ts";
 *
 * // Example 1: Calculate IQR of an array
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(iqr(x), 0.023);
 *
 * // Example 2: Calculate IQR for each row in a matrix
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(iqr(cat(0, x, y)), [[0.023], [0.095]]);
 * ```
 */
export default function iqr(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _iqr = function (a: number[]) {
    return prctile(a, 75) - prctile(a, 25);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _iqr);
}

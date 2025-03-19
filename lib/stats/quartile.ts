import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, prctile, vectorfun } from "../../index.ts";

/**
 * @function quartile
 * @summary Quartiles of a sample
 * @description Calculates the quartiles (25th, 50th, and 75th percentiles) of the values in array x
 *
 * @param x The input array or matrix
 * @param dim Optional dimension along which to compute quartiles. Default is 0 (rows)
 * @returns Array containing the three quartile values: [Q1, Q2, Q3]
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { quartile, cat } from "../../index.ts";
 *
 * // Example 1: Calculate quartiles of an array
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(quartile(x), [0.003, 0.015, 0.026]);
 *
 * // Example 2: Calculate quartiles for each row in a matrix
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(quartile(cat(0, x, y)), [[0.003, 0.015, 0.026], [-0.037, 0.0175, 0.058]]);
 * ```
 */
export default function quartile(
  x: numarraymatrix,
  dim: number = 0,
): numarraymatrix {
  const _quartile = function (a: number[]) {
    return [
      prctile(a, 25) as number,
      prctile(a, 50) as number,
      prctile(a, 75) as number,
    ];
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _quartile);
}

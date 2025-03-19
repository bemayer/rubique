import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, mean, minus, rdivide, std, vectorfun } from "../../index.ts";

/**
 * @function zscore
 * @summary Standardized Z score
 * @description Calculates the standardized z-score by subtracting the mean and dividing by the standard deviation
 *
 * @param x The input array or matrix
 * @param flag Optional normalization value (0: population, 1: sample). Default is 1
 * @param dim Optional dimension along which to compute z-scores. Default is 0 (rows)
 * @returns The z-score value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { zscore } from "../../index.ts";
 *
 * // Example 1: Calculate z-scores for an array
 * assertEquals(zscore([5, 6, 3]), [0.218218, 0.872872, -1.091089]);
 *
 * // Example 2: Calculate z-scores for each row of a matrix
 * assertEquals(
 *   zscore([[5, 6, 5], [7, 8, -1]]),
 *   [[-0.57735, 1.154701, -0.57735], [0.473016, 0.675737, -1.148754]]
 * );
 *
 * // Example 3: Calculate z-scores for each column of a matrix using population standard deviation
 * assertEquals(
 *   zscore([[5, 6, 5], [7, 8, -1]], 0, 1),
 *   [[-1, -1, 1], [1, 1, -1]]
 * );
 * ```
 */
export default function zscore(
  x: numarraymatrix,
  flag: number = 1,
  dim: number = 0,
): numarraymatrix {
  const _zscore = function (a: number[], normFlag: number) {
    return rdivide(minus(a, mean(a)), std(a, normFlag)) as number[];
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _zscore, flag);
}

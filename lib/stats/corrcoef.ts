import type { array, matrix } from "../types.d.ts";
import { cov, diag, rdivide, repmat, sqrt, transpose } from "../../index.ts";

/**
 * @function corrcoef
 * @summary Correlation coefficients of arrays
 * @description Calculates the correlation coefficients between arrays or matrices
 *
 * @param x The first input array or matrix
 * @param y Optional second input array or matrix
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns A matrix of correlation coefficients
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { corrcoef } from "../../index.ts";
 *
 * // Example 1: Correlation matrix of a matrix
 * const l = [[1, 1, -1], [1, -2, 3], [2, 3, 1]];
 * assertEquals(
 *   corrcoef(l),
 *   [[1, 0.802955, 0], [0.802955, 1, -0.59604], [0, -0.59604, 1]]
 * );
 *
 * // Example 2: Correlation between two arrays
 * const c = [5, 6, 3];
 * const d = [0.5, -3, 2.3];
 * assertEquals(
 *   corrcoef(c, d),
 *   [[1, -0.931151], [-0.931151, 1]]
 * );
 * ```
 */
export default function corrcoef(
  x: array | matrix,
  y?: array | matrix,
  flag: number = 1,
): matrix {
  // If y is provided, pass both x and y to cov, otherwise just x
  const covm = y !== undefined ? cov(x, y, flag) : cov(x, flag);

  const sigma = transpose(sqrt(diag(covm)));
  const m = sigma.length;

  let result = rdivide(covm, repmat(sigma, 1, m));
  result = rdivide(result, repmat(transpose(sigma), m, 1));

  return result;
}

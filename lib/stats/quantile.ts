import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { prctile } from "../../index.ts";

/**
 * @function quantile
 * @summary Quantiles of a sample
 * @description Calculates the p-th quantile of the values in array x
 *
 * @param x The input array or matrix
 * @param p The p-th quantile in the range [0,1]
 * @param dim Optional dimension along which to compute quantiles. Default is 0 (rows)
 * @returns The quantile value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { quantile, cat } from "../../index.ts";
 *
 * // Example 1: Calculate the first quartile (0.25 quantile) of an array
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(quantile(x, 0.25), 0.003);
 *
 * // Example 2: Calculate the 0.33 quantile for each row in a matrix
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(quantile(cat(0, x, y), 0.33), [[0.0118, -0.0242]]);
 * ```
 */
export default function quantile(
  x: numarraymatrix,
  p: number,
  dim: number = 0,
): numarraymatrix {
  if (p < 0 || p > 1) {
    throw new Error(
      "p-th quantile must be a real value between 0 and 1 inclusive",
    );
  }

  // Convert quantile (0-1) to percentile (0-100) and use prctile
  return prctile(x, p * 100, dim);
}

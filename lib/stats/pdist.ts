import type { array } from "../types.d.ts";
import { abs, max, minus, power, sqrt, sum } from "../../index.ts";

/**
 * @function pdist
 * @summary Pairwise distance between two sets of observations
 * @description Computes the distance between two arrays using different methods:
 * euclidean, manhattan, chebychev, hamming
 *
 * @param x The first input array
 * @param y The second input array
 * @param mode Optional distance method ('euclidean', 'manhattan', 'chebychev', or 'hamming'). Default is 'euclidean'
 * @returns The distance value
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { pdist } from "../../index.ts";
 *
 * // Example data
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Euclidean distance
 * assertEquals(pdist(x, y, 'euclidean'), 0.170532);
 *
 * // Example 2: Manhattan distance
 * assertEquals(pdist(x, y, 'manhattan'), 0.471);
 *
 * // Example 3: Chebyshev distance
 * assertEquals(pdist(x, y, 'chebychev'), 0.087);
 *
 * // Example 4: Hamming distance
 * assertEquals(pdist(x, y, 'hamming'), 10);
 * ```
 */
export default function pdist(
  x: array,
  y: array,
  mode: string = "euclidean",
): number {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }

  switch (mode) {
    case "euclidean":
      return sqrt(sum(power(minus(x, y), 2))) as number;

    case "manhattan":
      return sum(abs(minus(x, y))) as number;

    case "chebychev":
      return max(abs(minus(x, y))) as number;

    case "hamming":
      let distance = 0;
      for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) {
          distance++;
        }
      }
      return distance;

    default:
      throw new Error(
        "Invalid method. Must be 'euclidean', 'manhattan', 'chebychev', or 'hamming'",
      );
  }
}

import type { array, matrix } from "../types.d.ts";
import {
  cat,
  flatten,
  isscalar,
  isvector,
  mean,
  minus,
  mtimes,
  nrows,
  rdivide,
  repmat,
  transpose,
  varc,
} from "../../index.ts";

/**
 * @function cov
 * @summary Covariance matrix
 * @description Calculates the covariance matrix of arrays or matrices
 *
 * @param x The first input array or matrix
 * @param y Optional second input array or matrix or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns The covariance matrix or scalar covariance
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { cov } from "../../index.ts";
 *
 * // Example 1: Variance of a vector
 * const c = [5, 6, 3];
 * assertEquals(cov(c), 2.33333);
 *
 * // Example 2: Covariance between two vectors
 * const d = [0.5, -3, 2.3];
 * assertEquals(
 *   cov(c, d),
 *   [[2.333333, -3.833333], [-3.833333, 7.263333]]
 * );
 *
 * // Example 3: Population covariance (flag = 0)
 * assertEquals(
 *   cov(c, d, 0),
 *   [[1.555556, -2.555556], [-2.555556, 4.842222]]
 * );
 *
 * // Example 4: Covariance of matrices
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(
 *   cov(e, f),
 *   [[10.916667, 2], [2, 2]]
 * );
 *
 * // Example 5: Covariance matrix of a single matrix
 * const l = [[1, 1, -1], [1, -2, 3], [2, 3, 1]];
 * assertEquals(
 *   cov(l),
 *   [[0.333333, 1.166667, 0], [1.166667, 6.333333, -3], [0, -3, 4]]
 * );
 * ```
 */
export default function cov(
  x: array | matrix,
  y?: array | matrix | number,
  flag?: number,
): number | matrix {
  // Process arguments to handle optional parameters
  let actualFlag = 1; // Default flag value
  let actualY: array | matrix | undefined = undefined;

  if (typeof y === "number" && (y === 0 || y === 1)) {
    // y is being used as the flag
    actualFlag = y;
  } else if (y !== undefined) {
    // y is a second array/matrix
    actualY = y;

    if (typeof flag === "number" && (flag === 0 || flag === 1)) {
      actualFlag = flag;
    }
  }

  // Case 1: Single vector - return variance
  if (actualY === undefined && (isvector(x))) {
    const flatX = flatten(x);
    return varc(flatX, actualFlag);
  }

  // Case 2: Two arrays/vectors - calculate covariance matrix
  if (actualY !== undefined) {
    const transposedX = transpose(flatten(x));
    const transposedY = transpose(flatten(actualY));

    if (transposedX.length !== transposedY.length) {
      throw new Error("input dimension must agree");
    }

    x = cat(1, transposedX, transposedY);
  }

  // Calculate covariance matrix
  const m = nrows(x);
  const mu = mean(x, 1);
  const z = minus(x, repmat(mu, m, 1));

  return rdivide(mtimes(transpose(z), z), m - actualFlag);
}

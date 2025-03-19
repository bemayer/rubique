/** @import { array, matrix } from '../types.d.ts' */

import moment from "./moment.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function skewness
 * @summary Computes the skewness of a dataset.
 * @description Measures the asymmetry of the probability distribution of a dataset.
 * A positive skew indicates a longer tail on the right, while a negative skew indicates a longer tail on the left.
 *
 * @param {array|matrix} x The dataset (array or matrix).
 * @param {number} [flag=1] Bias correction flag (0 for bias correction, 1 for simple calculation).
 * @param {number} [dim=0] Dimension to compute skewness along (0 for row-wise, 1 for column-wise).
 * @returns {number|array|matrix} The computed skewness.
 * @throws {Error} If the input arguments are insufficient.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * import skewness from './skewness.ts';
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Compute skewness of an array
 * assertEquals(skewness(x), 0.617481);
 *
 * // Example 2: Compute skewness with bias correction
 * assertEquals(skewness(x, 0), 0.64892);
 *
 * // Example 3: Compute skewness for a matrix along rows
 * assert.deepStrictEqual(skewness([[...x], [...y]]), [[0.617481], [-0.118909]]);
 *
 * // Example 4: Compute skewness for a matrix along columns
 * assert.deepStrictEqual(skewness([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[1.223], [-1.223]]);
 *
 * // Example 5: Compute skewness for a dataset with equal elements (should be NaN)
 * assertEquals(skewness([1, 1, 1, 1, 1]), NaN);

 * ```*/
export default function skewness(x: any, flag = 1, dim = 0) {
  if (x === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeSkewness, flag);
}

function computeSkewness(arr: any, biasFlag: any) {
  const n = arr.length;
  const mom3 = moment(arr, 3) / moment(arr, 2) ** 1.5;

  return biasFlag === 1 ? mom3 : Math.sqrt((n - 1) / n) * (n / (n - 2)) * mom3;
}

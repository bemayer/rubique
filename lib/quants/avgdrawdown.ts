/** @import { array, matrix } from '../types.d.ts' */

import cdrawdown from "./cdrawdown.ts";
import mean from "../stats/mean.ts";
import sort from "../matarrs/sort.ts";
import subsetlin from "../matarrs/subsetlin.ts";
import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function avgdrawdown
 * @summary Computes the Average Drawdown
 * @description Computes the average drawdown of an asset/portfolio.
 * If `k` is greater than 0, it calculates the average of the `k` largest drawdowns.
 *
 * **Formula:**
 * - If `k = 0`: **Average Drawdown = Mean of all continuous drawdowns**
 * - If `k > 0`: **Average of the `k` largest drawdowns**
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [k=0] Number of largest drawdowns to consider (0 for all).
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed average drawdown.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { avgdrawdown, cat } from "../../index.ts";
 *
 * // Example 1: Average drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(avgdrawdown(x), 0.0115);
 *
 * // Example 2: Average of largest drawdown only
 * assertEquals(avgdrawdown(x, 1), 0.014);
 *
 * // Example 3: Average drawdown for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(avgdrawdown(cat(0, x, y)), [[0.0115], [0.0576]]);
 * ```
 */
export default function avgdrawdown(x: any, k = 0, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (x: any) => computeAvgDrawdown(x, k));
}

function computeAvgDrawdown(arr: any, k: any) {
  const cdd = cdrawdown(arr);
  if (k === 0) {
    return mean(cdd);
  }
  if (k > 0 && k <= cdd.length) {
    const sortedCdd = sort(cdd, "descend");
    return mean(subsetlin(sortedCdd, Array.from({ length: k }, (_, i) => i)));
  }
  return NaN;
}

/** @import { array, matrix } from '../types.d.ts' */

import sharpe from "./sharpe.ts";
import skewness from "../stats/skewness.ts";
import kurtosis from "../stats/kurtosis.ts";
import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function adjsharpe
 * @summary Computes the Adjusted Sharpe Ratio
 * @description The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * Adjusted Sharpe Ratio formula:
 * **ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]**
 * where:
 * - `SR` = Sharpe Ratio
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed Adjusted Sharpe Ratio.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { adjsharpe, cat } from "../../index.ts";
 *
 * // Example 1: Adjusted Sharpe ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(adjsharpe(x), 4.452175);
 *
 * // Example 2: Adjusted Sharpe ratio for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(adjsharpe(cat(0, x, y)), [[4.452175], [1.073158]]);
 * ``` */
export default function adjsharpe(x: any, frisk = 0, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: any) => computeAdjSharpe(arr, frisk));
}

function computeAdjSharpe(arr: any, frisk: any) {
  const sr = sharpe(arr, frisk);
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * Math.sqrt(sr));
}

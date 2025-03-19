/** @import { array, matrix } from '../types.d.ts' */

import annreturn from "./annreturn.ts";
import annrisk from "./annrisk.ts";
import skewness from "../stats/skewness.ts";
import kurtosis from "../stats/kurtosis.ts";
import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function annadjsharpe
 * @summary Computes the Annualized Adjusted Sharpe Ratio
 * @description The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * **Formula:**
 * ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]
 * where:
 * - `SR` = Annualized Sharpe Ratio (Annualized Return / Annualized Risk)
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate.
 * @param {number} [t=252] Data frequency:
 *   - 252: daily (default)
 *   - 52: weekly
 *   - 12: monthly
 *   - 4: quarterly
 * @param {string} [mode='geometric'] Return mode: 'geometric' or 'simple'.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed Annualized Adjusted Sharpe Ratio.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { annadjsharpe, cat } from "../../index.ts";
 *
 * // Example 1: Annualized adjusted Sharpe ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe(x, 0, 12), 1.73986);
 *
 * // Example 2: Annualized adjusted Sharpe with different parameters
 * assertEquals(annadjsharpe(x, 0.02, 12, 'simple'), 1.56587);
 *
 * // Example 3: Annualized adjusted Sharpe for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(annadjsharpe(cat(0, x, y), 0, 12), [[1.73986], [0.49273]]);
 * ``` */
export default function annadjsharpe(
  x: any,
  frisk = 0,
  t = 252,
  mode = "geometric",
  dim = 0,
) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(
    dim,
    x,
    (arr: any) => computeAnnAdjSharpe(arr, frisk, t, mode),
  );
}

function computeAnnAdjSharpe(arr: any, frisk: any, t: any, mode: any) {
  const annualReturn = annreturn(arr, t, mode);
  const annualRisk = annrisk(arr, t);
  const sr = (annualReturn - frisk) / annualRisk;
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * Math.sqrt(sr));
}

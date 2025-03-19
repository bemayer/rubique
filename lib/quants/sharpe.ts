import mean from "../stats/mean.ts";
import std from "../stats/std.ts";
import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function sharpe
 * @summary Computes the Sharpe Ratio
 * @description Calculates the Sharpe Ratio for an asset or portfolio given its returns and a risk-free rate.
 * The risk-free rate should be adjusted to match the timeframe of the returns.
 *
 * The Sharpe Ratio formula:
 * **SR = (Mean Return - Risk-Free Rate) / Standard Deviation**
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate (adjusted for the timeframe).
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed Sharpe Ratio.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { sharpe, cat } from "../../index.ts";
 *
 * // Example 1: Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(sharpe(x, 0.02 / 12), 0.698794);
 *
 * // Example 2: Sharpe Ratio with zero risk-free rate
 * assertEquals(sharpe(x), 1.366416);
 *
 * // Example 3: Sharpe Ratio for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(sharpe(cat(0, x, y)), [[1.366416], [0.329614]]);
 * ```
 */
export default function sharpe(x: any, frisk = 0, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: any) => computeSharpe(arr, frisk));
}

function computeSharpe(arr: any, frisk: any) {
  const meanReturn = mean(arr);
  const riskAdjustedReturn = meanReturn - frisk;
  const volatility = std(arr) as number;
  return riskAdjustedReturn / volatility;
}

/** @import { array, matrix } from '../types.d.ts' */

import isarray from "../datatype/isarray.ts";
import std from "../stats/std.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function annrisk
 * @summary Computes the Annualized Risk (Standard Deviation)
 * @description Computes the annualized standard deviation of asset or portfolio returns.
 * Standard deviation is scaled based on the frequency of the data.
 *
 * **Formula:**
 * Annualized Risk = **√t × Standard Deviation (σ)**
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [t=252] Frequency of data points in a year:
 *   - 1: yearly
 *   - 4: quarterly
 *   - 12: monthly
 *   - 52: weekly
 *   - 252: daily (default)
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed annualized risk (standard deviation).
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Annualized risk for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annrisk(x, 12), 0.08047276972160623);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => annrisk(123), /Input must be an array or matrix/);

 * ```*/
export default function annrisk(x: any, t = 252, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: any) => computeAnnRisk(arr, t));
}

function computeAnnRisk(arr: any, t: any) {
  return Math.sqrt(t) * (std(arr) as number);
}

/** @import { array, matrix } from '../types.d.ts' */

import mean from "../stats/mean.ts";
import prod from "../elemop/prod.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function annreturn
 * @summary Computes the annualized return
 * @description Calculates the annualized return of an asset or portfolio over a period.
 * It supports both geometric (compounded) and simple (arithmetic) return modes.
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [t=252] Frequency of data points in a year.
 *   (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily).
 * @param {string} [mode='geometric'] Return mode: 'geometric' (default) or 'simple'.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed annualized return.
 * @throws {Error} If the input is invalid or an unknown mode is specified.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { annreturn, cat } from "../../index.ts";
 *
 * // Example 1: Annualized return for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annreturn(x, 12), 0.2338146820656939);
 *
 * // Example 2: Annualized return with simple mode
 * assertEquals(annreturn(x, 12, 'simple'), 0.24);
 *
 * // Example 3: Annualized return for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(annreturn(cat(0, x, y), 12), [[0.2338146820656939], [0.12467878675658589]]);
 * ``` */
export default function annreturn(
  x: any,
  t = 252,
  mode = "geometric",
  dim = 0,
) {
  if (!Array.isArray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: any) => computeAnnReturn(arr, t, mode));
}

function computeAnnReturn(arr: any, t: any, mode: any) {
  const n = arr.length;
  if (mode === "geometric") {
    return Math.pow(prod(arr.map((val: any) => val + 1)), t / n) - 1;
  }
  if (mode === "simple") {
    return mean(arr) * t;
  }
  throw new Error("Unknown mode");
}

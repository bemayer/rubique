/** @import { array, matrix } from '../types.d.ts' */

import annreturn from "./annreturn.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function activereturn
 * @summary Computes the active return
 * @description Calculates the active return, which is the difference between the annualized return of an asset/portfolio and the annualized return of a benchmark.
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {array} y Benchmark returns.
 * @param {number} [t=252] Frequency of data points in a year. (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily).
 * @param {string} [mode='geometric'] The mode of return calculation: 'geometric' or 'simple'.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed active return.
 * @throws {Error} If inputs are not valid arrays or matrices.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { activereturn, cat } from "../../index.ts";
 *
 * // Example 1: Compute active return for a single portfolio and benchmark
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(activereturn(x, y, 12), 0.041979);
 *
 * // Example 2: Compute active return for multiple portfolios against a benchmark
 * const z = [0.04, -0.022, 0.043, 0.028, -0.078, -0.011, 0.033, -0.049, 0.09, 0.087];
 * assertEquals(activereturn(cat(0, x, y), z, 12), [[0.109144], [0.000008]]);
 * ```
 */
export default function activereturn(
  x: any,
  y: any,
  t = 252,
  mode = "geometric",
  dim = 0,
) {
  if (!Array.isArray(x) || !Array.isArray(y)) {
    throw new Error("Input must be an array or matrix");
  }

  const computeActiveReturn = (a: any, benchmark: any) =>
    annreturn(a, t, mode) - annreturn(benchmark, t, mode);

  return vectorfun(dim, x, computeActiveReturn, y);
}

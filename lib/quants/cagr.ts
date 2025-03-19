import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function cagr
 * @summary Compound Annual Growth Rate
 * @description Compound Annual Growth Rate
 *
 * @param x array of values
 * @param t array of time periods
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Compound Annual Growth Rate
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { cagr, cat } from "../../index.ts";
 *
 * // Example 1: CAGR for a single asset over time
 * var sp500 = [2679.63, 2643.85, 2206.45, 1769.30, 1378.43, 902.40, 676.53];
 * var date = [1998, 2000, 2005, 2010, 2015, 2020, 2022];
 * assertEquals(cagr(sp500, date), 0.05729);
 *
 * // Example 2: CAGR for multiple assets with the same time series
 * assertEquals(cagr(cat(0, sp500, sp500), date), [[0.05729], [0.05729]]);
 * ```
 */
export default function cagr(x: any, t: any, dim: any = 0): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _cagr = function (a: any, time: any) {
    const n = time[time.length - 1] - time[0];
    return Math.pow(a[0] / a[a.length - 1], 1 / n) - 1;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _cagr, t);
}

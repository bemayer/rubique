/**
 * Time Series Analysis
 */
// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { cumdev, isnumber, max, min, std, vectorfun } from "../../index.ts";

/**
 * @function hurst
 * @summary Hurst index/exponent
 * @description It's a useful statistic for detecting if a time series is mean reverting (anti-persistent), totally random or persistent.
 * A value in the range [0.5) indicates mean-reverting (anti-persistent)
 * A value of 0.5 indicate a random walk
 * A value H in the range (0.5,1] indicates momentum (persistent)
 *
 * @param x array of values
 * @param flag normalization value 0: population, 1:sample (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Hurst exponent
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { hurst, cat } from "../../index.ts";
 *
 * // Example 1: Hurst exponent for a single time series
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(hurst(x), 0.344059);
 *
 * // Example 2: Hurst exponent for multiple time series
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(hurst(cat(0,x,y)), [[0.344059], [0.36372]]);
 * ```
 */
export default function hurst(x: any, flag: any = 1, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _hurst = function (a: any, flag: any) {
    const cdeviation = cumdev(a);
    const rs = (max(cdeviation) - min(cdeviation)) / std(a, flag);
    return Math.log(rs) / Math.log(a.length);
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _hurst, flag);
}

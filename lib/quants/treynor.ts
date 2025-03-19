// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, linearreg, mean, vectorfun } from "../../index.ts";

/**
 * @function treynor
 * @summary Treynor Ratio
 * @description Compute the Treynor ratio for an array X of values (daily, weekly, etc) and
 * a free-risk rate. Annual free-risk must be divided to match the right timeframe.
 *
 * @param  x array of X values
 * @param  y array of Y values
 * @param  frisk  free-risk rate (def: 0)
 * @param  dim dimension 0: row, 1: column (def: 0)
 * @return The Treynor ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { treynor, cat } from "../../index.ts";
 *
 * // Example 1: Treynor ratio for a single asset against benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(treynor(x,z,0.01/12), -0.095687);
 *
 * // Example 2: Treynor ratio for multiple assets against benchmark
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(treynor(cat(0,x,y),z,0.01/12), [[-0.095687], [0.029863]]);
 * ```
 */
export default function treynor(
  x: any,
  y: any,
  frisk: any = 0,
  dim: any = 0,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _treynor = function (a: any, b: any, frisk: any) {
    const beta = linearreg(a, b).beta;
    return (mean(a) - frisk) / beta;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _treynor, y, frisk);
}

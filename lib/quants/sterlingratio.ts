// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { annreturn, cdrawdown, isnumber, max, vectorfun } from "../../index.ts";

/**
 * @function sterlingratio
 * @summary Sterling Ratio
 * @description A risk-adjusted performance measure like Calmar ratio but the denominator is
 * the largest consecutive drawdown (excluded the 10% excess in the original formula).
 * Sterling Ratio = (Annualized Return - Risk Free Rate) / Largest Drawdown
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Sterling Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { sterlingratio, cat } from "../../index.ts";
 *
 * // Example 1: Single asset sterling ratio
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(sterlingratio(x,0,12), 16.701049);
 *
 * // Example 2: Multiple assets sterling ratios
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(sterlingratio(cat(0,x,y),0,12), [[16.701049], [1.515412]]);
 * ```
 */
export default function sterlingratio(
  x: any,
  frisk: number = 0,
  t: number = 252,
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _sterlingratio = function (a: any, frisk: number, t: number) {
    const annualReturn = annreturn(a, t);
    const largestDrawdown = max(cdrawdown(a));
    return (annualReturn - frisk) / largestDrawdown;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _sterlingratio, frisk, t);
}

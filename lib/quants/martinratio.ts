// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { annreturn, isnumber, ulcerindex, vectorfun } from "../../index.ts";

/**
 * @function martinratio
 * @summary Martin Ratio
 * @description A risk-adjusted performance measure that uses the Ulcer Index to adjust for risk.
 * Martin Ratio = (Portfolio Return - RiskFree) / Ulcer Index
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Martin Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { martinratio, cat } from "../../index.ts";
 *
 * // Example 1: Martin ratio for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(martinratio(x,0,12), 44.425456);
 *
 * // Example 2: Martin ratio for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(martinratio(cat(0,x,y),0,12), [[44.425456], [2.438364]]);
 * ```
 */
export default function martinratio(
  x: any,
  frisk: number = 0,
  t: number = 252,
  mode: string = "return",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _martinratio = function (
    a: any,
    frisk: number,
    t: number,
    mode: string,
  ) {
    const annualReturn = annreturn(a, t);
    return (annualReturn - frisk) / ulcerindex(a, mode);
  };

  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, _martinratio, frisk, t, mode);
}

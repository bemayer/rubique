// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { annreturn, drawdown, isnumber, vectorfun } from "../../index.ts";

/**
 * @function calmarratio
 * @summary Calmar Ratio
 * @description A risk-adjusted measure like Sharpe ratio that uses maximum drawdown instead of
 * standard deviation for risk.
 * Calmar Ratio = (Annualized Return - Risk Free Rate) / Maximum Drawdown
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Calmar Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { calmarratio, cat } from "../../index.ts";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(calmarratio(x,0,12), 16.701049);
 *
 * // Example 2: Matrix of returns
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(calmarratio(cat(0,x,y),0,12), [[16.701049], [1.32768]]);
 * ```
 */
export default function calmarratio(
  x: any,
  frisk: number = 0,
  t: number = 252,
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _calmarratio = function (a: any, frisk: number, t: number) {
    const annualReturn = annreturn(a, t);
    const maxDrawdown = drawdown(a).maxdd;
    return (annualReturn - frisk) / maxDrawdown;
  };

  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, _calmarratio, frisk, t);
}

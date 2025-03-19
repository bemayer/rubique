// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import isnumber from "../datatype/isnumber.ts";
import annreturn from "./annreturn.ts";
import painindex from "./painindex.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function painratio
 * @summary Pain Ratio
 * @description A risk-adjusted measure with free risk and Pain index.
 * Pain Ratio = (Portfolio Return - RiskFree) / Pain Index
 *
 * It measures how much return is earned for each unit of pain (drawdown) experienced.
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Pain Ratio value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { painratio, cat } from "../../index.ts";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(painratio(x,0,12), 101.044955);
 *
 * // Example 2: Matrix of returns
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(painratio(cat(0,x,y),0,12), [[101.044955], [3.235687]]);
 * ```
 */
export default function painratio(
  x: any,
  frisk: number = 0,
  t: number = 252,
  mode: string = "geometric",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _painratio = function (a: any, frisk: number, t: number, mode: string) {
    const annualReturn = annreturn(a, t);
    return (annualReturn - frisk) / painindex(a, mode);
  };

  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, _painratio, frisk, t, mode);
}

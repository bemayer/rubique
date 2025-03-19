// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  drawdown,
  isnumber,
  power,
  sqrt,
  sum,
  vectorfun,
} from "../../index.ts";

/**
 * @function ulcerindex
 * @summary Ulcer Index
 * @description Ulcer Index of Peter G. Martin (1987). The impact of long, deep drawdowns will have significant
 * impact because the underperformance since the last peak is squared.
 * The formula is: sqrt(sum(dd^2) / n), where dd is the drawdown and n is the number of observations.
 *
 * @param x asset/portfolio returns
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Ulcer Index
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { ulcerindex } from "../../index.ts";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(ulcerindex(x), 0.005263);
 *
 * // Example 2: Matrix of returns with column dimension
 * var xt = [[0.003,0.026],[0.015,-0.009],[0.014,0.024],[0.015,0.066],[-0.014,0.039]];
 * assertEquals(ulcerindex(xt,'return',1), [[0.006261, 0.004025]]);
 * ```
 */
export default function ulcerindex(
  x: any,
  mode: string = "return",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _uidx = function (a: any, mode: string) {
    const dd = drawdown(a, mode).dd;
    const n = a.length;
    return sqrt(sum(power(dd, 2)) / n);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _uidx, mode);
}

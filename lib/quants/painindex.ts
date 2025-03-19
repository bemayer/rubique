// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { drawdown, isnumber, sum, vectorfun } from "../../index.ts";

/**
 * @function painindex
 * @summary Pain Index
 * @description Mean value of the drawdowns, similar to Ulcer Index.
 * It measures the depth, duration, and frequency of losses.
 *
 * @param x asset/portfolio returns
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Pain Index
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { painindex, cat } from "../../index.ts";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(painindex(x), 0.0023);
 *
 * // Example 2: Matrix of returns
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(painindex(cat(0,x,y)), [[0.0023], [0.042955]]);
 * ```
 */
export default function painindex(
  x: any,
  mode: string = "return",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _painindex = function (a: any, mode: string) {
    const dd = drawdown(a, mode).dd;
    const n = a.length;
    return sum(dd) / n;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _painindex, mode);
}

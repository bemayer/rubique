// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, minus, std, vectorfun } from "../../index.ts";

/**
 * @function trackerr
 * @summary Tracking Error (ex-post)
 * @description Ex-post tracking error, which measures the standard deviation of the difference
 * between portfolio returns and benchmark returns.
 *
 * @param x array or matrix of portfolio/asset returns
 * @param y array of benchmark returns
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return tracking error value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { trackerr, cat } from "../../index.ts";
 *
 * // Example 1: Single asset tracking error
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(trackerr(x,z), 0.068436);
 *
 * // Example 2: Multiple assets tracking error
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(trackerr(cat(0,x,y),z), [[0.068436], [0.058622]]);
 * ```
 */
export default function trackerr(
  x: any,
  y: array,
  dim: number = 0,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _te = function (a: any, b: any) {
    return std(minus(a, b));
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _te, y);
}

// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  ismatrix,
  isvector,
  mean,
  sharpe,
  std,
  vectorfun,
} from "../../index.ts";

/**
 * @function modigliani
 * @summary Modigliani-Modigliani measure (M2)
 * @description The Modigliani-Modigliani measure (M2) is a risk-adjusted performance
 * measure that represents the return a portfolio would have achieved if it had taken
 * the same risk as the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Modigliani-Modigliani measure
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { modigliani, cat } from "../../index.ts";
 *
 * // Example 1: Modigliani measure for a single asset vs benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(modigliani(x,y), 0.040694);
 *
 * // Example 2: Modigliani measure for multiple assets vs benchmark
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(modigliani(cat(0,x,y),z), [[0.042585], [0.013185]]);
 * ```
 */
export default function modigliani(
  x: any,
  y: any,
  frisk: any = 0,
  dim: any = 0,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _modigliani = function (a: any, b: any, frisk: any) {
    return mean(a) + sharpe(a, frisk) * (std(b) - std(a));
  };

  if (isvector(x) && isvector(y)) {
    return _modigliani(x, y, frisk);
  } else if (ismatrix(x) && isvector(y)) {
    return vectorfun(dim, x, _modigliani, y, frisk);
  } else {
    throw new Error(
      "first input must be an array/matrix, the second one an array",
    );
  }
}

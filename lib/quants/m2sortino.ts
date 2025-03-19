// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  annreturn,
  downsiderisk,
  ismatrix,
  isvector,
  sortino,
  sqrt,
  vectorfun,
} from "../../index.ts";

/**
 * @function m2sortino
 * @summary M-squared for Sortino
 * @description M2 calculated for Downside risk instead of Total Risk.
 * It represents the portfolio return adjusted for downside risk relative to the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param mar minimum acceptable return (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return M-squared for Sortino
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { m2sortino, cat } from "../../index.ts";
 *
 * // Example 1: Single asset vs benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(m2sortino(x,y,0,0,12), 0.103486);
 *
 * // Example 2: Multiple assets vs different benchmark
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(m2sortino(cat(0,x,y),z,0,0,12), [[0.527018], [0.148094]]);
 * ```
 */
export default function m2sortino(
  x: any,
  y: any,
  frisk: number = 0,
  mar: number = 0,
  t: number = 252,
  dim: number = 0,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _m2sortino = function (
    a: any,
    b: any,
    frisk: number,
    mar: number,
    t: number,
  ) {
    return annreturn(a, t) +
      sortino(a, frisk, mar) *
        (downsiderisk(b, mar) * sqrt(t) -
          downsiderisk(a, mar) * sqrt(t));
  };

  if (isvector(x) && isvector(y)) {
    return _m2sortino(x, y, frisk, mar, t);
  } else if (ismatrix(x) && isvector(y)) {
    return vectorfun(dim, x, _m2sortino, y, frisk, mar, t);
  } else {
    throw new Error(
      "first input must be an array/matrix, the second one an array",
    );
  }
}

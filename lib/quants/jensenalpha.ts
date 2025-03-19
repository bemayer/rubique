// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { ismatrix, isvector, linearreg, mean, vectorfun } from "../../index.ts";

/**
 * @function jensenalpha
 * @summary Jensen alpha
 * @description Ex-post alpha calculated with regression line. Free-risk is the average free-risk
 * for the timeframe selected. Jensen alpha measures the excess return of a portfolio over the
 * theoretical expected return based on the portfolio's beta and CAPM model.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Jensen alpha value
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { jensenalpha, cat } from "../../index.ts";
 *
 * // Example 1: Single asset vs benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(jensenalpha(x,y), 0.017609);
 *
 * // Example 2: Multiple assets vs benchmark
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(jensenalpha(cat(0,x,y),z), [[0.020772], [0.006256]]);
 * ```
 */
export default function jensenalpha(
  x: any,
  y: array,
  frisk: number = 0,
  dim: number = 0,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _ja = function (a: any, b: any, frisk: number) {
    const beta = linearreg(a, b).beta;
    return mean(a) - frisk - beta * (mean(b) - frisk);
  };

  if (isvector(x) && isvector(y)) {
    return _ja(x, y, frisk);
  } else if (ismatrix(x) && isvector(y)) {
    return vectorfun(dim, x, _ja, y, frisk);
  } else {
    throw new Error(
      "first input must be an array/matrix, the second one an array",
    );
  }
}

// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  ismatrix,
  isvector,
  mean,
  minus,
  std,
  vectorfun,
} from "../../index.ts";

/**
 * @function inforatio
 * @summary Information Ratio
 * @description Measures portfolio returns in excess of a benchmark relative to the
 * volatility of those excess returns. The information ratio measures the skill of
 * an asset manager to generate excess returns relative to a benchmark.
 *
 * @param x asset/portfolio returns
 * @param y benchmark returns
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Information Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { inforatio, cat } from "../../index.ts";
 *
 * // Example 1: Information ratio between a single asset and benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(inforatio(x,y), 0.093692);
 *
 * // Example 2: Information ratio for multiple assets against benchmark
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(inforatio(cat(0,x,y),z), [[0.026302], [-0.059705]]);
 * ```
 */
export default function inforatio(x: any, y: any, dim: any = 0): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _inforatio = function (a: any, b: any) {
    return mean(minus(a, b)) / std(minus(a, b));
  };

  if (isvector(x) && isvector(y)) {
    return _inforatio(x, y);
  } else if (ismatrix(x) && isvector(y)) {
    return vectorfun(dim, x, _inforatio, y);
  } else {
    throw new Error(
      "first input must be an array/matrix, the second one an array",
    );
  }
}

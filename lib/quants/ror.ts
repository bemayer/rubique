// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { clone, cumprod, isnumber, plus, vectorfun } from "../../index.ts";

/**
 * @function ror
 * @summary Simple Rate of Return
 * @description Simple rate of return calculated from the last and the first value of
 * an array of numbers. Can work with return series or cumulative value series.
 *
 * @param x array or matrix of returns or values
 * @param mode mode of values, 'ret' for returns, 'cum' for cumulative (def: 'ret')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Simple Rate of Return
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { ror, cat } from "../../index.ts";
 *
 * // Example 1: Simple rate of return on return series
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(ror(x), 0.187793);
 *
 * // Example 2: Rate of return on cumulative value series
 * assertEquals(ror([100,101,99,98,97,102,103,104],'cum'), 0.04);
 *
 * // Example 3: Rate of return on matrix of return series
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(ror(cat(0,x,y),'ret'), [[0.187793], [0.125149]]);
 * ```
 */
export default function ror(
  x: any,
  mode: string = "ret",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _ror = function (a: any, mode: string) {
    let eq;
    if (mode === "ret") {
      eq = cumprod(plus(1, a));
    } else if (mode === "cum") {
      eq = clone(a);
    } else {
      throw new Error("unknown value");
    }
    return eq[eq.length - 1] / eq[0] - 1;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _ror, mode);
}

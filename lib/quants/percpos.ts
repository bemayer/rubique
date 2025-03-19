// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function percpos
 * @summary Percentage of positive values in array or matrix
 * @description Calculates the percentage of positive (non-negative) values in an array or matrix.
 * This is a common metric to assess the consistency of returns.
 *
 * @param x array of elements
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Percentage of positive values
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { percpos, cat } from "../../index.ts";
 *
 * // Example 1: Percentage of positive values in a single array
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(percpos(x), 0.8);
 *
 * // Example 2: Percentage of positive values for multiple arrays (row-wise)
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(percpos(cat(0,x,y)), [[0.8], [0.5]]);
 *
 * // Example 3: Percentage of positive values calculated column-wise
 * assertEquals(percpos(cat(0,x,y),1), [[0.5, 1, 1, 0, 0.5, 1, 0.5, 0.5, 0.5, 1]]);
 * ```
 */
export default function percpos(x: any, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _percpos = function (a: any) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] >= 0) {
        count++;
      }
    }
    return count / a.length;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _percpos);
}

// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function downsidepot
 * @summary Downside Potential
 * @description Measure of the average deviation below a minimum acceptable return threshold
 *
 * @param x array or matrix of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Potential
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { downsidepot, cat } from "../../index.ts";
 *
 * // Example 1: Downside potential with custom MAR
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(downsidepot(x, 0.001), 0.0023);
 *
 * // Example 2: Downside potential for multiple assets with default MAR
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(downsidepot(cat(0,x,y)), [[0.0023], [0.0173]]);
 * ```
 */
export default function downsidepot(x: any, mar: any = 0, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _downsidepot = function (a: any, mar: any) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.max(mar - a[i], 0) / a.length;
    }
    return sum;
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _downsidepot, mar);
}

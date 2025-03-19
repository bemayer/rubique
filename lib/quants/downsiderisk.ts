// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { find, isnumber, mean, std, vectorfun } from "../../index.ts";

/**
 * @function downsiderisk
 * @summary Downside Risk
 * @description  Downside risk is the semi-standard deviation of returns below a
 * Minimum Acceptable Return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { downsiderisk, cat } from "../../index.ts";
 *
 * // Example 1: Downside risk for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(downsiderisk(x), 0.0115);
 *
 * // Example 2: Downside risk for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(downsiderisk(cat(0,x,y)), [[0.0115], [0.042967]]);
 * ```
 */
export default function downsiderisk(x: any, mar: any = 0, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _downsiderisk = function (a: any, mar: any) {
    const idx = find(a, function (el: any) {
      return el < mar;
    });
    if (idx.length === 0) {
      return 0;
    }
    const downside = [];
    for (let i = 0; i < idx.length; i++) {
      downside[i] = a[idx[i]];
    }
    return std(downside);
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _downsiderisk, mar);
}

import type { array, matrix } from "../types.d.ts";
import { find, isnumber, mean, vectorfun } from "../../index.ts";

/**
 * @function upsidepot
 * @summary Upside Potential
 * @description Average of positive returns, higher than a target return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { upsidepot, cat } from "../../index.ts";
 *
 * // Example 1: Upside potential for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(upsidepot(x), 0.02525);
 *
 * // Example 2: Upside potential for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(upsidepot(cat(0,x,y)), [[0.02525], [0.0598]]);
 * ```
 */
export default function upsidepot(x: any, mar: any = 0, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _upsidepot = function (a: any, mar: any) {
    const idx = find(a, function (el: any) {
      return el > mar;
    });

    if (idx.length === 0) {
      return 0;
    }

    const upside = [];
    for (let i = 0; i < idx.length; i++) {
      upside[i] = a[idx[i]];
    }

    return mean(upside);
  };

  if (isnumber(x)) {
    return x > mar ? x : 0;
  }

  return vectorfun(dim, x, _upsidepot, mar);
}

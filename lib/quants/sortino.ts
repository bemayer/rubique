import type { array, matrix } from "../types.d.ts";
import { downsiderisk, isnumber, mean, vectorfun } from "../../index.ts";

/**
 * @function sortino
 * @summary Sortino Ratio
 * @description Sortino ratio where the risk is represented by Downside Risk
 *
 * @param x array of values
 * @param frisk free-risk rate (def: 0)
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Sortino Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { sortino, cat } from "../../index.ts";
 *
 * // Example 1: Sortino ratio for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(sortino(x, 0.01/12), 0.984932);
 *
 * // Example 2: Sortino ratio for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(sortino(cat(0,x,y), 0.01/12), [[0.984932], [0.307917]]);
 * ```
 */
export default function sortino(
  x: any,
  frisk: any = 0,
  mar: any = 0,
  dim: any = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _sortino = function (a: any, frisk: any, mar: any) {
    return (mean(a) - frisk) / downsiderisk(a, mar);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _sortino, frisk, mar);
}

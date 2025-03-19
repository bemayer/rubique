// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { downsidepot, isnumber, upsidepot, vectorfun } from "../../index.ts";

/**
 * @function omegaratio
 * @summary Omega Ratio
 * @description The Omega ratio is a measure of risk-return performance that divides
 * the upside potential (gains) by the downside risk (losses) relative to a
 * minimum acceptable return threshold.
 *
 * @param x asset/portfolio returns
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Omega Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { omegaratio, cat } from "../../index.ts";
 *
 * // Example 1: Omega ratio for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(omegaratio(x), 8.782609);
 *
 * // Example 2: Omega ratio for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(omegaratio(cat(0,x,y)), [[8.782609], [1.728324]]);
 * ```
 */
export default function omegaratio(x: any, mar: any = 0, dim: any = 0): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _omegaratio = function (a: any, mar: any) {
    return upsidepot(a, mar) / downsidepot(a, mar);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _omegaratio, mar);
}

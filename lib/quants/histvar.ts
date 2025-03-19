// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, quantile, vectorfun } from "../../index.ts";

/**
 * @function histvar
 * @summary Historical Value-At-Risk
 * @description Univariate historical simulation. Single asset
 *
 * @param x array or matrix of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param amount amount (def: 1)
 * @param period time horizon (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return The calculated Historical Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { histvar, cat } from "../../index.ts";
 *
 * // Example 1: Daily VaR at 95% confidence level
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(histvar(cat(0,x,y),0.95), [[0.014], [0.061]]);
 *
 * // Example 2: VaR with different parameters (confidence, amount, period)
 * assertEquals(histvar(cat(0,x,y),0.99,100000,10), [[4427.188724], [19289.893727]]);
 * ```
 */
export default function histvar(
  x: any,
  p: any = 0.95,
  amount: any = 1,
  period: any = 1,
  dim: any = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _histvar = function (a: any, p: any, amount: any, period: any) {
    return -quantile(a, 1 - p) * Math.sqrt(period) * amount;
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _histvar, p, amount, period);
}

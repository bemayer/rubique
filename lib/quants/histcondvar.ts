// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { find, isnumber, mean, quantile, vectorfun } from "../../index.ts";

/**
 * @function histcondvar
 * @summary Historical Conditional Value-At-Risk (CVaR)
 * @description Univariate historical simulation for Conditional Value-At-Risk.
 * Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * The CVaR is the expected loss exceeding the VaR.
 *
 * @param x array or matrix of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param amount amount (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return {number|array} Historical Conditional Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { histcondvar, cat } from "../../index.ts";
 *
 * // Example 1: Historical conditional VaR for multiple assets
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(histcondvar(cat(0,x,y),0.95), [[-0.014], [-0.061]]);
 *
 * // Example 2: Historical conditional VaR with custom amount
 * assertEquals(histcondvar(x,0.99,100000), 1400);
 * ```
 */
export default function histcondvar(
  x: any,
  p: any = 0.95,
  amount: any = 1,
  dim: any = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _histcondvar = function (a: any, p: any, amount: any) {
    const q = quantile(a, 1 - p);
    // find values below quantile
    const idx = find(a, function (el: any) {
      return el <= q;
    });
    const cvar = [];
    for (let i = 0; i < idx.length; i++) {
      cvar[i] = a[idx[i]];
    }
    return -mean(cvar) * amount;
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _histcondvar, p, amount);
}

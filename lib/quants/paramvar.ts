// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  flatten,
  iscolumn,
  ismatrix,
  isnumber,
  isrow,
  norminv,
  transpose,
} from "../../index.ts";

/**
 * @function paramvar
 * @summary Parametric Value-At-Risk
 * @description Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range [0,1] (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { paramvar, mean, std, cat } from "../../index.ts";
 *
 * // Example 1: VaR with default parameters
 * assertEquals(paramvar(0,1), 1.644854);
 *
 * // Example 2: VaR with arrays
 * assertEquals(paramvar([0,0,0],[1,2,3]), [1.644854, 3.289707, 4.934561]);
 *
 * // Example 3: Parametric VaR for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(paramvar(mean(x), std(x)), 0.020311);
 *
 * // Example 4: Parametric VaR for multiple assets
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(paramvar(mean(cat(0,x,y)), std(cat(0,x,y))), [[0.020311], [0.074269]]);
 * ```
 */
export default function paramvar(
  mu: any,
  sigma: any,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _pvar = function (
    _mu: any,
    _sigma: any,
    p: number,
    amount: number,
    period: number,
  ) {
    return (-norminv(1 - p) * _sigma - _mu) * Math.sqrt(period) * amount;
  };

  if (isnumber(mu)) {
    return _pvar(mu, sigma, p, amount, period);
  }

  const temp = flatten(mu);
  const out = temp.map(function (el: any, idx: number) {
    return _pvar(mu[idx], sigma[idx], p, amount, period);
  });

  if (ismatrix(mu) && isrow(mu)) {
    return [out];
  }

  if (ismatrix(mu) && iscolumn(mu)) {
    return transpose(out);
  }

  return out;
}

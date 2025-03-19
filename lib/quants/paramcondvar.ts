// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  flatten,
  iscolumn,
  ismatrix,
  isnumber,
  isrow,
  norminv,
  normpdf,
  transpose,
} from "../../index.ts";

/**
 * @function paramcondvar
 * @summary Parametric Conditional Value-At-Risk
 * @description Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range [0,1] (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { paramcondvar, mean, std, cat } from "../../index.ts";
 *
 * // Example 1: Parametric daily CVaR for a single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(paramcondvar(mean(x), std(x)), 0.030018);
 *
 * // Example 2: Parametric CVaR for multiple assets with additional parameters
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(paramcondvar(mean(cat(0,x,y)), std(cat(0,x,y)), 0.99, 100000, 10),
 *   [[19578.980844], [44511.107219]]);
 * ```
 */
export default function paramcondvar(
  mu: any,
  sigma: any,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): any {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _pcvar = function (
    _mu: any,
    _sigma: any,
    p: number,
    amount: number,
    period: number,
  ) {
    return _sigma * normpdf(norminv(1 - p)) / (1 - p) * amount *
        Math.sqrt(period) - _mu;
  };

  if (isnumber(mu)) {
    return _pcvar(mu, sigma, p, amount, period);
  }

  const temp = flatten(mu);
  const out = temp.map(function (el: any, idx: number) {
    return _pcvar(mu[idx], sigma[idx], p, amount, period);
  });

  if (ismatrix(mu) && isrow(mu)) {
    return [out];
  }

  if (ismatrix(mu) && iscolumn(mu)) {
    return transpose(out);
  }

  return out;
}

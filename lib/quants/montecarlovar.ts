// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import {
  isnumber,
  isundefined,
  mean,
  quantile,
  rand,
  std,
  tick2ret,
  vectorfun,
  zeros,
} from "../../index.ts";

/**
 * @function montecarlovar
 * @summary Monte Carlo Value-At-Risk
 * @description Monte Carlo simulation for VaR calculation
 *
 * @param x array of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param nsim number of simulations (def: 1000)
 * @param period time horizon (def: 1)
 * @param amount amount (def: 1)
 * @param mode calculation mode: 'simple' (default) or 'continuous'
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Monte Carlo Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { montecarlovar, cat } from "../../index.ts";
 *
 * // Example 1: Monte Carlo VaR for multiple assets
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * // Note: The result will vary due to randomness in the simulation
 * // This is a placeholder assertion to demonstrate usage
 * const mcVar = montecarlovar(cat(0,x,y), 0.95, 10000);
 * assertEquals(typeof mcVar[0][0], "number");
 * assertEquals(mcVar.length, 2);
 * ```
 */
export default function montecarlovar(
  x: any,
  p: number = 0.95,
  nsim: number = 1000,
  period: number = 1,
  amount: number = 1,
  mode: string = "simple",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _mcvar = function (
    a: any,
    p: number,
    nsim: number,
    period: number,
    amount: number,
    mode: string,
  ) {
    // Calculate historical returns
    const returns = tick2ret(a, mode);

    // Calculate mean and standard deviation of returns
    const mu = mean(returns);
    const sigma = std(returns);

    // Generate random returns based on normal distribution
    const simReturns = zeros(nsim, 1);
    for (let i = 0; i < nsim; i++) {
      // Generate random normal return
      const z = rand(1, "normal");
      simReturns[i] = mu + sigma * z;
    }

    // Convert returns to prices for the specified period
    const simPrices = zeros(nsim, 1);
    const lastPrice = a[a.length - 1];

    if (mode === "simple") {
      for (let i = 0; i < nsim; i++) {
        simPrices[i] = lastPrice * Math.pow(1 + simReturns[i], period);
      }
    } else if (mode === "continuous") {
      for (let i = 0; i < nsim; i++) {
        simPrices[i] = lastPrice * Math.exp(simReturns[i] * period);
      }
    }

    // Calculate VaR as the quantile of the simulated price distribution
    const losses = zeros(nsim, 1);
    for (let i = 0; i < nsim; i++) {
      losses[i] = lastPrice - simPrices[i];
    }

    return quantile(losses, p) * amount;
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _mcvar, p, nsim, period, amount, mode);
}

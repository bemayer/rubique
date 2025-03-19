// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { array, cumprod, isnumber, log, plus, vectorfun } from "../../index.ts";

/**
 * @function drawdown
 * @summary Drawdown
 * @description Calculates drawdown from peak, which represents any continuous losing return period.
 * Returns drawdown array, recovery index, maximum drawdown, and maximum drawdown recovery period.
 *
 * Returns an object with:
 * - dd (drawdown array)
 * - ddrecov (drawdown recovery index)
 * - maxdd (max drawdown)
 * - maxddrecov (max drawdown recovery period): [start period, end period]
 *
 * @param x asset/portfolio returns
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Drawdown information object
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { drawdown } from "../../index.ts";
 *
 * // Example 1: Calculate drawdown metrics for a return series
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * const result = drawdown(x);
 * assertEquals(result.dd, [0, 0, 0, 0.009, 0, 0, 0, 0, 0.014, 0]);
 * assertEquals(result.ddrecov, [0, 0, 0, 4, 0, 0, 0, 0, 9, 0]);
 * assertEquals(result.maxdd, 0.014);
 * assertEquals(result.maxddrecov, [8, 9]);
 * ```
 */
export default function drawdown(
  x: any,
  mode: string = "return",
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const calculateDrawdown = function (a: any, mode: string) {
    let prices;
    if (mode === "return") {
      prices = cumprod(plus(a, 1));
    } else if (mode === "geometric") {
      prices = log(cumprod(plus(a, 1)));
    } else {
      throw new Error("unknown drawdown mode");
    }

    let highest = prices[0];
    let highestidx = 1;
    const _dd = array(prices.length, 0);
    const _recov = array(prices.length, 0);
    let _maxdd = 0;
    const _maxddidx = [1, prices.length];

    for (let i = 0; i < prices.length; i++) {
      if (highest <= prices[i]) {
        highest = prices[i];
        highestidx = i + 1;
      }

      if (mode === "return") {
        _dd[i] = (highest - prices[i]) / highest;
      } else if (mode === "geometric") {
        _dd[i] = highest - prices[i];
      }

      if (_dd[i] !== 0) {
        _recov[i] = i + 1;
      }

      if (_dd[i] > _maxdd) {
        _maxdd = _dd[i];
        _maxddidx[0] = highestidx;
        _maxddidx[1] = i + 1;
      }
    }

    return {
      dd: _dd,
      ddrecov: _recov,
      maxdd: _maxdd,
      maxddrecov: _maxddidx,
    };
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, calculateDrawdown, mode);
}

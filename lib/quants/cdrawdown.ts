import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function cdrawdown
 * @summary Computes the Continuous Drawdown
 * @description Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {array|matrix} The computed continuous drawdowns.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { cdrawdown, cat } from "../../index.ts";
 *
 * // Example 1: Continuous drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown(x), [0.009, 0.014]);
 *
 * // Example 2: Continuous drawdown for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(cdrawdown(cat(0, x, y)), [[0.009, 0.014], [0.005, 0.098, 0.07]]);
 * ``` */
export default function cdrawdown(x: any, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, computeContinuousDrawdown);
}

function computeContinuousDrawdown(returns: any) {
  return returns.reduce(
    ({
      drawdowns,
      drawdown,
      max,
    }: any, value: any) => {
      const newDrawdown = Math.min(drawdown + value, 0);
      const newMax = Math.min(max, newDrawdown);

      return {
        drawdowns: [...drawdowns, -newMax],
        drawdown: newDrawdown,
        max: newMax,
      };
    },
    { drawdowns: [], drawdown: 0, max: 0 },
  ).drawdowns;
}

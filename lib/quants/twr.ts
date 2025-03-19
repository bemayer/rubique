// deno-lint-ignore-file no-explicit-any
import type { array } from "../types.d.ts";
import { prod } from "../../index.ts";

/**
 * @function twr
 * @summary True Time-weighted return
 * @description True Time-weighted return measures the returns of the assets irrespective of the amount invested.
 * It eliminates the impact of cash flows, focusing solely on the performance of the investments themselves.
 *
 * @param mv array of market values
 * @param cf array of external cashflows (inflows/outflows)
 * @return time-weighted return
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { twr } from "../../index.ts";
 *
 * // Example 1: Calculate true time-weighted return with market values and cash flows
 * var mv = [250000,255000,257000,288000,293000,285000], cf = [0,0,25000,0,-10000,0];
 * assertEquals(twr(mv,cf), 0.07564769566198049);
 * ```
 */
export default function twr(mv: array, cf: array | number = 0): number {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  // If cf is a number, create an array with the same length as mv
  if (typeof cf === "number") {
    cf = Array(mv.length).fill(cf);
  }

  if (mv.length !== cf.length) {
    throw new Error("market value and cash flows must be of the same size");
  }

  const _twr = [1];
  for (let i = 1; i < mv.length; i++) {
    _twr[i] = mv[i] / (mv[i - 1] + cf[i - 1]);
  }

  return prod(_twr) - 1;
}

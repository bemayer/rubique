/**
 * Time Series Analysis
 */
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { cat, isnumber, isundefined, sum } from "../../index.ts";

/**
 * @function tomonthly
 * @summary Convert a return series to a monthly series
 * @description Convert a return series to a monthly series (e.g. from daily to monthly)
 *
 * @param x array of values
 * @param mode calculation mode: 'simple' (default) or 'continuous'
 * @return monthly series
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { tomonthly } from "../../index.ts";
 *
 * // Example 1: Convert daily returns to monthly returns using simple mode
 * var dailyReturns = [
 *   0.001, 0.002, -0.001, 0.004, 0.005, // Week 1
 *   0.002, -0.003, 0.001, 0.002, 0.004, // Week 2
 *   0.003, 0.001, -0.002, 0.003, 0.002, // Week 3
 *   0.001, 0.004, 0.003, -0.001, 0.002  // Week 4
 * ];
 * assertEquals(tomonthly(dailyReturns), 0.0288);
 *
 * // Example 2: Convert daily returns to monthly returns using continuous mode
 * assertEquals(tomonthly(dailyReturns, "continuous"), 0.0284);
 * ```
 */
export default function tomonthly(x: any, mode: string = "simple"): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(x)) {
    return x;
  }

  if (mode === "simple") {
    let monthly = 1;
    for (let i = 0; i < x.length; i++) {
      monthly *= 1 + x[i];
    }
    return monthly - 1;
  } else if (mode === "continuous") {
    return sum(x);
  } else {
    throw new Error("unknown return method");
  }
}

import type { array, matrix } from "../types.d.ts";
import { isnumber, isundefined } from "../../index.ts";

/**
 * @function mdietz
 * @summary Modified Dietz Return
 * @description Compute the Modified Dietz Return. It takes into account the timing
 * of the cash flows, weighting them by the time they were held in the portfolio.
 *
 * @param ev ending value
 * @param bv beginning value
 * @param cf cash flow array
 * @param cfd cash flow dates array as fraction of the total period
 * @return Modified Dietz Return
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { mdietz } from "../../index.ts";
 *
 * // Example 1: Calculate Modified Dietz Return with multiple cash flows
 * var bv = 100000; // beginning value
 * var ev = 110000; // ending value
 * var cf1 = 10000; //cash flow 1 (inflow)
 * var cf2 = 5000;  //cash flow 2 (inflow)
 * var cf3 = -2000; //cash flow 3 (outflow)
 * var cf = [cf1,cf2,cf3]; //cash flow array
 * var cfd = [0.25,0.5,0.75]; //cash flow dates array as fraction of the total period
 *
 * assertEquals(mdietz(ev,bv,cf,cfd), 0.068627);
 * ```
 */
export default function mdietz(ev: any, bv: any, cf: any, cfd: any): any {
  if (arguments.length < 4) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(cf)) {
    cf = [cf];
  }

  if (isnumber(cfd)) {
    cfd = [cfd];
  }

  if (isundefined(cf)) {
    cf = [];
  }

  let CF = 0;
  let W = 0;
  for (let i = 0; i < cf.length; i++) {
    CF = CF + cf[i];
    W = W + cf[i] * (1 - cfd[i]);
  }

  return (ev - bv - CF) / (bv + W);
}

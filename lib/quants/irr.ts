// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { colon } from "../../index.ts";

/**
 * @function irr
 * @summary Internal rate of return on an investment based on a series of periodic cash flows
 * @description Calculates the internal rate of return on an investment
 * based on a series of regularly/irregurarly periodic cash flows.
 *
 * @param cf income or payments associated with the investment. Must contain at least one negative and one positive cash flow to calculate rate of return, and the first amount must be negative
 * @param cfd number of calendar days from the beginning of the period that cash flow occurs
 * @param cd total number of calendar days in the measurement period
 * @param guess estimate for what the internal rate of return will be (def: 0.1)
 * @return Internal rate of return
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { irr } from "../../index.ts";
 *
 * // Example 1: Simple IRR with regular cash flows
 * assertEquals(irr([250000,25000,-10000,-285000]), 0.024713);
 *
 * // Example 2: Simple IRR with time periods
 * assertEquals(irr([74.2,37.1,-104.4],[0,1,2],2), -0.074108);
 *
 * // Example 3: Modified IRR with irregular time periods
 * assertEquals(irr([250000,25000,-10000,-285000],[0,45,69,90],90), 0.076923);
 *
 * // Example 4: Modified IRR with different calendar days
 * assertEquals(irr([74.2,37.1,-104.4],[0,14,31],31), -0.072715);
 * ```
 */
export default function irr(cf: any, cfd?: any, cd?: any, guess?: any): any {
  if (arguments.length < 1) {
    throw new Error("not enough input arguments");
  }

  const _npv = function (cf: any, cfd: any, cd: any, guess: any) {
    let npv = 0;
    for (let i = 0; i < cf.length; i++) {
      npv += cf[i] / Math.pow(1 + guess, cfd[i] / cd);
    }
    return npv;
  };

  const _npvd = function (cf: any, cfd: any, cd: any, guess: any) {
    let npv = 0;
    for (let i = 0; i < cf.length; i++) {
      npv -= cfd[i] / cd * cf[i] / Math.pow(1 + guess, cfd[i] / cd);
    }
    return npv;
  };

  if (arguments.length === 1) {
    cfd = colon(0, cf.length - 1, 1);
    cd = 1;
    guess = 0.1;
  }

  if (arguments.length === 2) {
    cd = 1;
    guess = 0.1;
  }

  if (arguments.length === 3) {
    guess = 0.1;
  }

  let rate = guess;
  const maxeps = 1e-6;
  const maxiter = 50;
  let newrate = 0;
  let epsrate = 0;
  let npv = 0;
  let cnt = 0;
  let cntv = true;

  do {
    npv = _npv(cf, cfd, cd, rate);
    newrate = rate - npv / _npvd(cf, cfd, cd, rate);
    epsrate = Math.abs(newrate - rate);
    rate = newrate;
    cntv = (epsrate > maxeps) && (Math.abs(npv) > maxeps);
  } while (cntv && (cnt++ < maxiter));

  if (cntv) {
    throw new Error("number error");
  }

  return rate;
}

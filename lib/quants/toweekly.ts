/**
 * Time Series Analysis
 */
// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { cat, find, ismatrix, isvector, subset, weekday } from "../../index.ts";

/**
 * @function toweekly
 * @summary Convert a time series to a weekly frequency
 * @description Convert a time series to a weekly frequency. Default: all days
 * in the range. Example: daily dates [Wed,...Fri,...Mon,...Fri,...Thu] will become
 * [Wed,...,Fri...,Fri...,Thu]
 *
 * @param nd array of unix dates
 * @param nv array or matrix of values
 * @return matrix of weekly dates and values
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { toweekly, datenum } from "../../index.ts";
 *
 * // Example 1: Convert daily data to weekly frequency
 * var result = toweekly(datenum(['15-01-15','15-01-23','15-01-30','15-02-04'],'YY-MM-DD'),[100,99,102,103,98]);
 * assertEquals(result[0], [ 1421280000, 1421971200, 1422576000, 1423008000 ]);
 * assertEquals(result[1], [ 100, 99, 102, 103 ]);
 * ```
 */
export default function toweekly(nd: array, nv: any): [array, array | matrix] {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const wd = weekday(nd);

  // basic mode: all data, exact on Friday
  let idx = find(wd.map(function (a: any) {
    return a === 5;
  }));

  if (wd[0] !== 5) {
    idx = cat(1, 0, idx);
  }

  if (wd[wd.length - 1] !== 5) {
    idx = cat(1, idx, nd.length - 1)[0];
  }

  let newv;
  if (isvector(nv)) {
    newv = subset(nv, idx);
  }

  if (ismatrix(nv)) {
    newv = subset(nv, idx, ":");
  }

  return [subset(nd, idx), newv];
}

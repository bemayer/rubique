/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import rdivide from "../elemop/rdivide.ts";
import numel from "../matarrs/numel.ts";
import size from "../matarrs/size.ts";
import sum from "../elemop/sum.ts";

/**
 * @function mean
 * @summary Average value of array or matrix
 * @description Computes the average value of an array or matrix along a specified dimension.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=0] The dimension along which to calculate. `0` for row-wise, `1` for column-wise. Defaults to `0`.
 * @returns {number|array} The mean value(s).
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Mean of a vector
 * assertEquals(mean([5, 6, 3]), 4.66667);
 *
 * // Example 2: Mean of a matrix along rows (dim=0)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]]), [5.333333, 4.666667]);
 *
 * // Example 3: Mean of a matrix along columns (dim=1)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]], 1), [6, 7, 2]);

 * ```*/
export default function mean(x: any, dim = 0) {
  if (!x) throw new Error("Not enough input arguments");

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return sum(x, dim) / numel(x);
  }

  // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
  return rdivide(sum(x, dim), size(x, dim)[1 - dim]);
}

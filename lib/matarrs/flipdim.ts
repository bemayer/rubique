/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import isarray from "../datatype/isarray.ts";
import clone from "./clone.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function flipdim
 * @summary Flip the order of elements in an array or matrix.
 * @description Flips the order of elements in an array or matrix along a specified dimension. Default dimension is 1 (columns).
 *
 * @param {array|matrix} x The array or matrix to flip.
 * @param {number} [dim=1] The dimension to apply the flip (0 = rows, 1 = columns). Defaults to 1.
 * @returns {array|matrix} The array or matrix with flipped elements.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flip a 1D array (dim = 1)
 * flipdim([5, 6, 3], 1); // [3, 6, 5]
 *
 * // Example 2: Flip a 1D array with no dimension specified (no change)
 * flipdim([5, 6, 3], 0); // [5, 6, 3]
 *
 * // Example 3: Flip a 2D matrix along columns (dim = 1)
 * flipdim([[5, 6, 5], [7, 8, -1]]); // [[5, 6, 5], [-1, 8, 7]]
 *
 * // Example 4: Flip a 2D matrix along rows (dim = 0)
 * flipdim([[5, 6, 5], [7, 8, -1]], 0); // [[7, 8, -1], [5, 6, 5]]

 * ```*/
export default function flipdim(x: any, dim = 1) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  const flipArray = (arr: any) => clone(arr.reverse());

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return dim === 1 ? flipArray(x) : x;
  }

  if (ismatrix(x)) {
    return vectorfun(1 - dim, x, flipArray);
  }

  throw new Error("Unknown input arguments");
}

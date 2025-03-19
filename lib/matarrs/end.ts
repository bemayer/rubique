/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function end
 * @summary Returns the last index in an array or matrix.
 * @description Returns the last index of an array or matrix. For matrices, you can specify the dimension: -1 for both rows and columns, 0 for rows, and 1 for columns.
 *
 * @param {array|matrix} x Input array or matrix.
 * @param {number} [dim=-1] For matrix: -1 (both), 0 (rows), 1 (columns).
 * @returns {number|array} Last index or indices.
 * @throws {Error} If no arguments are provided or if the dimension is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Last index of a vector
 * console.log(end([5, 6, 3])); // 2
 *
 * // Example 2: Last indices of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]])); // [1, 2]
 *
 * // Example 3: Last row index of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]], 0)); // 1
 *
 * // Example 4: Last column index of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]], 1)); // 2
 *
 * // Example 5: Last index of a number (returns the number itself)
 * console.log(end(5)); // 5

 * ```*/
export default function end(x: any, dim = -1) {
  if (x === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return x.length - 1;
  }

  if (ismatrix(x)) {
    if (!Number.isInteger(dim) || dim < -1 || dim > 1) {
      throw new Error("Dimension must be -1, 0, or 1");
    }

    const idx = [nrows(x) - 1, ncols(x) - 1];

    if (dim === -1) {
      return idx;
    }

    return idx[dim];
  }

  throw new Error("Unknown input arguments");
}

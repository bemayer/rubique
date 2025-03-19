/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import transpose from "./transpose.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function flatten
 * @summary Flatten a matrix into an array.
 * @description Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param {matrix} x The matrix to flatten.
 * @param {number} [dim=0] The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns {array} The flattened 1D array.
 * @throws {Error} If no input is provided or if the input is not a matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flatten a 2x2 matrix (row-wise by default)
 * flatten([[5, 6], [7, 8]]); // [5, 7, 6, 8]
 *
 * // Example 2: Flatten a 3x3 matrix by rows
 * flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]); // [1, 1, -1, 1, -2, 3, 2, 3, 1]
 *
 * // Example 3: Flatten a 3x3 matrix by columns (dim = 1)
 * flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1); // [1, 1, 2, 1, -2, 3, -1, 3, 1]

 * ```*/
export default function flatten(x: any, dim = 0) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x) || isarray(x)) {
    return x;
  }

  if (ismatrix(x)) {
    const matrixToFlatten = dim === 1 ? transpose(x) : x;
    return [].concat(...matrixToFlatten);
  }

  throw new Error("Unknown input arguments");
}

/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import clone from "../matarrs/clone.ts";
import { array, matrix } from "../types.d.ts";

/**
 * @function cat
 * @summary Concatenates arrays and matrices along the specified dimension.
 * @description Concatenates arrays and matrices along the specified dimension. Supports vertical (0) and horizontal (1) concatenation.
 *
 * @param dim The dimension along which to concatenate (0: rows, 1: columns).
 * @param args Variable arguments to concatenate.
 * @returns {array|matrix} The concatenated array or matrix.
 * @throws {Error} If not enough input arguments are provided or if dimensions do not match for concatenation.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Vertical Concatenation (dim = 0) with numbers
 * assert.deepStrictEqual(cat(0, 1, 2, 3, 4), [[1], [2], [3], [4]]);
 *
 * // Example 2: Vertical Concatenation (dim = 0) with arrays
 * assert.deepStrictEqual(cat(0, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3], [0.5, -3, 2.3]]);
 *
 * // Example 3: Vertical Concatenation (dim = 0) with matrix and array
 * assert.deepStrictEqual(cat(0, [[5, 6, 5], [7, 8, -1]], [5, 6, 3]), [[5, 6, 5], [7, 8, -1], [5, 6, 3]]);
 *
 * // Example 4: Horizontal Concatenation (dim = 1) with numbers
 * assert.deepStrictEqual(cat(1, 1, 2, 3, 4), [[1, 2, 3, 4]]);
 *
 * // Example 5: Horizontal Concatenation (dim = 1) with arrays
 * assert.deepStrictEqual(cat(1, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3, 0.5, -3, 2.3]]);
 *
 * // Example 6: Horizontal Concatenation (dim = 1) with matrix and arrays
 * assert.deepStrictEqual(cat(1, [[2, 3, 4]], [5, 6, 3], [0.5, -3, 2.3]), [[2, 3, 4, 5, 6, 3, 0.5, -3, 2.3]]);

 * ```*/
export default function cat(
  dim: number,
  ...args: array | matrix
): array | matrix {
  if (args.length === 0) {
    throw new Error("not enough input arguments");
  }
  if (dim !== 0 && dim !== 1) {
    throw new Error("dimension must be 0 (rows) or 1 (columns)");
  }

  const normalizedArgs = args.map((arg) => normalize(arg));
  return dim === 0
    ? verticalConcat(normalizedArgs)
    : horizontalConcat(normalizedArgs);
}

/**
 * @function normalize
 * @description Normalizes the input arguments into a 2D matrix form for easier concatenation.
 * @param {number|array|matrix} arg The argument to normalize.
 * @returns {matrix} The normalized 2D matrix.
 */
function normalize(arg: any) {
  if (isnumber(arg)) {
    return [[arg]];
  }
  if (isarray(arg) && !ismatrix(arg)) {
    return [arg];
  }
  if (ismatrix(arg)) {
    return arg;
  }
  throw new Error("unknown input argument");
}

/**
 * @function verticalConcat
 * @description Concatenates matrices vertically (along rows).
 * @param {array} args The list of matrices to concatenate vertically.
 * @returns {matrix} The vertically concatenated matrix.
 */
function verticalConcat(args: any) {
  const result: matrix = [];
  const numCols = ncols(args[0]);

  for (const arg of args) {
    if (ncols(arg) !== numCols) {
      throw new Error("concatenation dimension mismatch");
    }
    for (const row of arg) {
      result.push(row);
    }
  }
  return result;
}

/**
 * @function horizontalConcat
 * @description Concatenates matrices horizontally (along columns).
 * @param args The list of matrices to concatenate horizontally.
 * @returns The horizontally concatenated matrix.
 */
function horizontalConcat(args: matrix[]): matrix {
  const result = clone(args[0]);
  const numRows = nrows(args[0]);

  for (let i = 1; i < args.length; i++) {
    const current = args[i];
    if (nrows(current) !== numRows) {
      throw new Error("concatenation dimension mismatch");
    }
    for (let j = 0; j < numRows; j++) {
      result[j] = result[j].concat(current[j]);
    }
  }
  return result;
}

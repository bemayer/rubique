/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import colon from "./colon.ts";
import nrows from "./nrows.ts";
import ncols from "./ncols.ts";
import zeros from "./zeros.ts";
import squeeze from "./squeeze.ts";
import isarray from "../datatype/isarray.ts";
import isundefined from "../datatype/isundefined.ts";

/**
 * @function subset
 * @summary Extract a subset of an array or matrix based on row and column indices.
 * @description Extracts a subset from an array or matrix based on specified row and column indices.
 * If the indices are not provided, the entire array or matrix is returned. Use ':' to select all rows or columns.
 *
 * @param {array|matrix} m The input array or matrix.
 * @param {number|array|string} [r] The row index or ':' for all rows.
 * @param {number|array|string} [c] The column index or ':' for all columns.
 * @returns {number|array|matrix} The extracted subset of the array or matrix.
 * @throws {Error} If the input arguments are invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Extract a single element from an array
 * const c = [5, 6, 3];
 * assertEquals(subset(c, 1), 6);
 *
 * // Example 2: Extract multiple elements from an array
 * assert.deepStrictEqual(subset(c, [1, 2]), [6, 3]);
 *
 * // Example 3: Extract the last element from an array
 * assertEquals(subset(c, c.length - 1), 3);
 *
 * // Example 4: Extract a single element from a matrix
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(subset(a, 0, 1), [[6]]);
 *
 * // Example 5: Extract a submatrix
 * assert.deepStrictEqual(subset(a, [0, 1], [1, 2]), [[6, 5], [8, -1]]);
 *
 * // Example 6: Extract an entire row
 * assert.deepStrictEqual(subset(a, 0, ':'), [[5, 6, 5]]);
 *
 * // Example 7: Extract an entire column
 * assert.deepStrictEqual(subset(a, ':', 0), [[5], [7]]);

 * ```*/
export default function subset(m: any, r?: any, c?: any) {
  if (isundefined(r) && isundefined(c)) {
    return m;
  }

  if (isundefined(c)) {
    return handleArraySubset(m, r);
  }

  return handleMatrixSubset(m, r, c);
}

/**
 * @function handleArraySubset
 * @description Handles subset extraction for arrays (1D).
 * @param {array} array The input array.
 * @param {number|array} indices The indices to extract.
 * @returns {number|array} The extracted subset.
 */
function handleArraySubset(array: any, indices: any) {
  if (isnumber(array)) {
    return array;
  }

  if (isarray(array)) {
    if (isnumber(indices)) {
      return array[indices];
    } else {
      return indices.map((index: any) => array[index]);
    }
  }

  throw new Error("input must be an array");
}

/**
 * @function handleMatrixSubset
 * @description Handles subset extraction for matrices (2D).
 * @param {matrix} matrix The input matrix.
 * @param {number|array|string} rows The row indices or ':' for all rows.
 * @param {number|array|string} cols The column indices or ':' for all columns.
 * @returns {matrix} The extracted subset of the matrix.
 * @throws {Error} If the input is not a matrix.
 */
function handleMatrixSubset(matrix: any, rows: any, cols: any) {
  if (!ismatrix(matrix)) {
    throw new Error("input must be a matrix");
  }

  if (rows === ":") {
    rows = colon(0, nrows(matrix) - 1);
  }

  if (cols === ":") {
    cols = colon(0, ncols(matrix) - 1);
  }

  if (isnumber(rows)) {
    rows = [rows];
  }

  if (isnumber(cols)) {
    cols = [cols];
  }

  const result = zeros(rows.length, cols.length);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      result[i][j] = matrix[rows[i]][cols[j]];
    }
  }

  return squeeze(result);
}

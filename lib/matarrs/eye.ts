/** @import { array, matrix } from '../types.d.ts' */

import zeros from "./zeros.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function eye
 * @summary Identity matrix
 * @description Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param {number|array} dimOrRows The number of rows, or an array specifying both dimensions.
 * @param {number} [cols] The number of columns (optional if the first argument is an array).
 * @returns {matrix} The identity matrix of the specified dimensions.
 * @throws {Error} If no input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create a 0x0 matrix (empty matrix)
 * assert.deepStrictEqual(eye(0), []);
 *
 * // Example 2: Create a 1x1 identity matrix
 * assert.deepStrictEqual(eye(1), [[1]]);
 *
 * // Example 3: Create a 2x2 identity matrix
 * assert.deepStrictEqual(eye(2), [[1, 0], [0, 1]]);
 *
 * // Example 4: Create a 2x1 identity matrix
 * assert.deepStrictEqual(eye([2, 1]), [[1], [0]]);
 *
 * // Example 5: Create a 2x3 identity matrix
 * assert.deepStrictEqual(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);

 * ```*/
export default function eye(dimOrRows: any, cols: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  let nrows, ncols;

  if (isarray(dimOrRows)) {
    [nrows, ncols] = dimOrRows;
  } else {
    nrows = dimOrRows;
    ncols = cols !== undefined ? cols : nrows;
  }

  // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
  const matrix = zeros([nrows, ncols]);

  for (let i = 0; i < Math.min(nrows, ncols); i++) {
    matrix[i][i] = 1;
  }

  return matrix;
}

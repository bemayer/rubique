/** @import { matrix } from '../types.d.ts' */

import isarray from "../datatype/isarray.ts";

/**
 * @function zeros
 * @summary Create an array or matrix of all zeros.
 * @description Creates an array or matrix filled with zeros based on the specified dimensions. If no arguments are provided, it defaults to a 1x1 matrix.
 *
 * @param {number|array} [nrowsOrDims=1] The number of rows or an array specifying both dimensions. Defaults to 1.
 * @param {number} [ncols=1] The number of columns (optional if the first argument is an array).
 * @returns {matrix} A matrix of zeros with the specified dimensions.
 * @throws {Error} If invalid input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create a 1x1 matrix of zeros (default behavior)
 * assert.deepStrictEqual(zeros(), [[0]]);
 *
 * // Example 2: Create a 2x2 square matrix of zeros
 * assert.deepStrictEqual(zeros(2), [[0, 0], [0, 0]]);
 *
 * // Example 3: Create a 2x3 matrix of zeros
 * assert.deepStrictEqual(zeros(2, 3), [[0, 0, 0], [0, 0, 0]]);
 *
 * // Example 4: Create a 2x1 matrix of zeros using array input
 * assert.deepStrictEqual(zeros([2, 1]), [[0], [0]]);

 * ```*/
export default function zeros(nrowsOrDims: any, ncols: any) {
  const dimensions = isarray(nrowsOrDims) ? nrowsOrDims : [nrowsOrDims ?? 1];

  const [nrows] = dimensions;
  const cols = ncols ?? dimensions[1] ?? nrows;

  return Array.from({ length: nrows }, () => Array(cols).fill(0));
}

/** @import { array, matrix } from '../types.d.ts' */
import isarray from "../datatype/isarray.ts";
import rem from "../elemop/rem.ts";

/**
 * @function ind2sub
 * @summary Converts linear index to row and column subscripts.
 * @description Converts a linear index or array of linear indices into the equivalent row and column subscripts for a given matrix size. This allows converting a 1D index into 2D row/column positions.
 *
 * @param {array} size Size of the matrix as [rows, columns].
 * @param {number|array} index Linear index or array of indices [0...N-1].
 * @returns {array|matrix} The corresponding row and column subscripts.
 * @throws {Error} If no arguments are provided or if inputs are invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Convert linear index 5 to subscripts in a 2x3 matrix
 * var a = [[5,6,5],[7,8,-1]];
 * console.log(ind2sub([2, 3], 5)); // [1, 2]
 *
 * // Example 2: Convert multiple linear indices to subscripts
 * console.log(ind2sub([2, 3], [0, 1, 2])); // [[0, 0], [1, 0], [0, 1]]
 *
 * // Example 3: Convert linear index to subscripts in a vector (3x1 matrix)
 * console.log(ind2sub([3, 1], 2)); // [2, 0]
 *
 * // Example 4: Invalid input (size is not an array)
 * // Throws error: 'size must be an array representing the matrix dimensions'

 * ```*/
export default function ind2sub(size: any, index: any) {
  if (!Array.isArray(size)) {
    throw new Error("size must be an array representing the matrix dimensions");
  }
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const _ind2sub = (siz: any, idx: any) => {
    const row = rem(idx, siz[0]) as number;
    const col = (idx - row) / siz[0];
    return [row, col];
  };

  if (isarray(index)) {
    return index.map((idx: any) => _ind2sub(size, idx));
  }

  return _ind2sub(size, index);
}

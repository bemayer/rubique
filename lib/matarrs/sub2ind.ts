import getcol from "./getcol.ts";
import squeeze from "./squeeze.ts";
import numel from "./numel.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function sub2ind
 * @summary Converts 2D subscripts to linear indices.
 * @description Converts 2D coordinates `[X, Y]` into linear indices based on the given matrix size.
 *
 * @param {array|matrix} size The size of the matrix.
 * @param {array|matrix} index X, Y coordinates in the range `[0...N-1]`.
 * @returns {number|array} The computed linear index or an array of indices.
 * @throws {Error} If input arguments are missing or invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var a = [[5,6,5],[7,8,-1]];
 *
 * // Example 1: Convert single 2D coordinate to linear index
 * assertEquals(sub2ind([2, 3], [1, 2]), 5);
 *
 * // Example 2: Convert multiple 2D coordinates to linear indices
 * assert.deepStrictEqual(sub2ind([2, 3], [[0, 0], [1, 0], [0, 1]]), [0, 1, 2]);
 *
 * // Example 3: Convert index for a row vector
 * assertEquals(sub2ind([1, 3], [2, 0]), 2);

 * ```*/
export default function sub2ind(size: any, index: any) {
  if (!size || !index) {
    throw new Error("Not enough input arguments.");
  }

  const indexArray = isarray(index) ? [index] : index;
  const x = getcol(indexArray, 0);
  const y = getcol(indexArray, 1);
  const indices = x.map((xi, i) => xi + y[i] * size[0]);

  return numel(indices) === 1 ? squeeze(indices)[0] : squeeze(indices);
}

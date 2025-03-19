/** @import { array, matrix } from '../types.d.ts' */

import minus from "./minus.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function ne
 * @summary Inequality X !== Y
 * @description Compares two inputs and returns `true` if they are not equal. Handles individual numbers, arrays, and matrices.
 *
 * @param {number|array|matrix} x The left operand.
 * @param {number|array|matrix} y The right operand.
 * @returns {boolean|array<boolean>|matrix<boolean>} `true` if the corresponding elements of `x` and `y` are not equal, otherwise `false`.
 * @throws {Error} If fewer than two arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compare two numbers
 * assertEquals(ne(5, 5), false);
 *
 * // Example 2: Compare a number with an array
 * assert.deepStrictEqual(ne(5, [5, 6, 3]), [false, true, true]);
 *
 * // Example 3: Compare a number with a matrix
 * assert.deepStrictEqual(ne(5, [[5, 6], [3, 5]]), [[false, true], [true, false]]);
 *
 * // Example 4: Compare an array with a number
 * assert.deepStrictEqual(ne([5, 6, 3], 5), [false, true, true]);
 *
 * // Example 5: Compare a matrix with a number
 * assert.deepStrictEqual(ne([[5, 6], [3, 5]], 5), [[false, true], [true, false]]);
 *
 * // Example 6: Compare two arrays
 * assert.deepStrictEqual(ne([5, 6, 3], [2, 6, 0]), [true, false, true]);
 *
 * // Example 7: Compare two matrices
 * assert.deepStrictEqual(ne([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);

 * ```*/
export default function ne(x: any, y: any) {
  if (arguments.length < 2) {
    throw new Error("Not enough input arguments");
  }

  const difference = minus(x, y);
  return arrayfun(difference, (el: any) => el !== 0);
}

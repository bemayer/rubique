/** @import { array, matrix } from '../types.d.ts' */

import minus from "./minus.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function gt
 * @summary Checks if values in one array are greater than the corresponding values in another array.
 * @description Compares two inputs, which can be numbers, arrays, or matrices, and returns `true` where elements in the left input are greater than the corresponding elements in the right input.
 *
 * @param {number|array|matrix} x Left-hand side value(s) for comparison.
 * @param {number|array|matrix} y Right-hand side value(s) for comparison.
 * @returns {boolean|array<boolean>|matrix<boolean>} The result of the comparison.
 * @throws {Error} If fewer than two arguments are provided.
 *
 * @example
 * // Example 1: Comparison between two numbers
 * assert.strictEqual(gt(5, 5), false);
 *
 * // Example 2: Comparison between a number and an array
 * assert.deepStrictEqual(gt(5, [5, 6, 3]), [false, false, true]);
 *
 * // Example 3: Comparison between a number and a matrix
 * assert.deepStrictEqual(gt(5, [[5, 6], [3, 5]]), [[false, false], [true, false]]);
 *
 * // Example 4: Comparison between an array and a number
 * assert.deepStrictEqual(gt([5, 6, 3], 5), [false, true, false]);
 *
 * // Example 5: Comparison between a matrix and a number
 * assert.deepStrictEqual(gt([[5, 6], [3, 5]], 5), [[false, true], [false, false]]);
 *
 * // Example 6: Comparison between two arrays
 * assert.deepStrictEqual(gt([5, 6, 3], [2, 6, 0]), [true, false, true]);
 *
 * // Example 7: Comparison between two matrices
 * assert.deepStrictEqual(gt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [false, false]]);
 */
export default function gt(x: any, y: any) {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _gt = (el: any) => el > 0;
  const difference = minus(x, y);
  return arrayfun(difference, _gt);
}

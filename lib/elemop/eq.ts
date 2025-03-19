/** @import { array, matrix } from '../types.d.ts' */

import minus from "../elemop/minus.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function eq
 * @summary Checks for equality between two values or arrays.
 * @description Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param {number|array|matrix} x Left-hand side value(s) for comparison.
 * @param {number|array|matrix} y Right-hand side value(s) for comparison.
 * @returns {boolean|array<boolean>|matrix<boolean>} The result of the equality comparison.
 * @throws {Error} If fewer than two arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Equality comparison between two numbers
 * assertEquals(eq(5, 5), true);
 *
 * // Example 2: Equality comparison between a number and an array
 * assert.deepStrictEqual(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * // Example 3: Equality comparison between a number and a matrix
 * assert.deepStrictEqual(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * // Example 4: Equality comparison between an array and a number
 * assert.deepStrictEqual(eq([5, 6, 3], 5), [true, false, false]);
 *
 * // Example 5: Equality comparison between a matrix and a number
 * assert.deepStrictEqual(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * // Example 6: Equality comparison between two arrays
 * assert.deepStrictEqual(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * // Example 7: Equality comparison between two matrices
 * assert.deepStrictEqual(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);

 * ```*/
export default function eq(x: any, y: any) {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const _eq = (el: any) => el === 0;
  const difference = minus(x, y);
  return arrayfun(difference, _eq);
}

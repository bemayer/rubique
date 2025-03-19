/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function trues
 * @summary Creates an array filled with `true` values.
 * @description Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param {number|array|...} args Variable input arguments (max 2).
 * @returns {matrix<boolean>} A matrix filled with `true` values.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create an empty array
 * assert.deepStrictEqual(trues(0), []);
 *
 * // Example 2: Create a 1x1 matrix of `true`
 * assert.deepStrictEqual(trues(1), [[true]]);
 *
 * // Example 3: Create a 2x2 matrix of `true`
 * assert.deepStrictEqual(trues(2), [[true, true], [true, true]]);
 *
 * // Example 4: Create a 2x1 matrix of `true`
 * assert.deepStrictEqual(trues([2,1]), [[true], [true]]);
 *
 * // Example 5: Create a 2x3 matrix of `true`
 * assert.deepStrictEqual(trues(2,3), [[true, true, true], [true, true, true]]);

 * ```*/
export default function trues(rows: any, cols: any) {
  if (arguments.length === 1) {
    cols = rows;
  }

  if (Array.isArray(rows)) {
    [rows, cols] = rows;
  }

  if (typeof rows !== "number" || typeof cols !== "number") {
    throw new Error("Invalid dimensions");
  }

  return Array.from({ length: rows }, () => Array(cols).fill(true));
}

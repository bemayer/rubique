/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function uminus
 * @summary Unary minus -X
 * @description Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param {number|array|matrix} x The input number, array, or matrix to be negated.
 * @returns {number|array|matrix} The negated value(s).
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Unary minus on a single number
 * assertEquals(uminus(-5), 5);
 *
 * // Example 2: Unary minus on an array of numbers
 * assert.deepStrictEqual(uminus([5, 6]), [-5, -6]);
 *
 * // Example 3: Unary minus on a matrix of numbers
 * assert.deepStrictEqual(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);

 * ```*/
export default function uminus(x: any) {
  if (x === undefined) throw new Error("Not enough input arguments");

  return Array.isArray(x)
    ? x.map((row) => Array.isArray(row) ? row.map((val) => -val) : -row)
    : -x;
}

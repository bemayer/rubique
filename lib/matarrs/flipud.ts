/** @import { array, matrix } from '../types.d.ts' */
import flipdim from "./flipdim.ts";
import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * @function flipud
 * @summary Flip a matrix upside down.
 * @description Reverses the order of the rows in the input matrix, flipping it upside down.
 *
 * @param {array|matrix} x The input array or matrix.
 * @returns {array|matrix} The matrix with its rows flipped upside down.
 * @throws {Error} If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flip a 2D matrix upside down
 * assert.deepStrictEqual(flipud([[1, 4], [2, 5], [3, 6]]), [[3, 6], [2, 5], [1, 4]]);
 *
 * // Example 2: Flip a single number (should return the number itself)
 * assertEquals(flipud(5), 5);
 *
 * // Example 3: Invalid input (should throw an error for non-matrix, non-number input)
 * assert.throws(() => { flipud('invalid'); }, Error, 'Unknown input arguments');
 *
 * // Example 4: No input provided (should throw an error)
 * assert.throws(() => { flipud(); }, Error, 'Not enough input arguments');

 * ```*/
export default function flipud(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x)) {
    return x;
  }

  if (ismatrix(x)) {
    return flipdim(x, 0); // Flip rows (upside down)
  }

  throw new Error("Unknown input arguments");
}

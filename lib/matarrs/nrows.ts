import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import { array, matrix } from "../types.d.ts";
import size from "./size.ts";

/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function nrows
 * @summary Returns the number of rows in an array or matrix.
 * @description Returns the number of rows in a 1D array (treated as a row vector) or a 2D matrix.
 *
 * @param x Array or matrix of elements.
 * @returns The number of rows in the input.
 *
 * @throws {Error} - Throws an error if no input is provided or if the input is not an array.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Row vector (1D array)
 * assertEquals(nrows([5, 6, 7]), 1);
 *
 * // Example 2: Matrix with multiple rows (2D array)
 * assertEquals(nrows([[3, 2, 7], [4, 5, 6]]), 2);

 * ```*/
export default function nrows(x: array | matrix): number {
  return size(x)[0];
}

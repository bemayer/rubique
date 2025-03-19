import ismatrix from "../datatype/ismatrix.ts";

/**
 * @function isrow
 * @summary Checks if the input is a row vector.
 * @description Returns `true` if the input matrix is a row vector, meaning it has exactly one row and more than one column.
 *
 * @param {any} x The input matrix to check.
 * @returns {boolean} Returns `true` if `x` is a row vector, otherwise `false`.
 * @throws {Error} If the input is not a valid matrix or if no argument is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Valid row vector
 * assertEquals(isrow([[2, 2]]), true);
 *
 * // Example 2: Column vector (not a row vector)
 * assertEquals(isrow([[2], [2]]), false);
 *
 * // Example 3: Row vector with multiple columns
 * assertEquals(isrow([[1, 2, 3]]), true);
 *
 * // Example 4: Square matrix (not a row vector)
 * assertEquals(isrow([[1, 2], [3, 4]]), false);
 *
 * // Example 5: Single-element row vector
 * assertEquals(isrow([[1]]), true);
 *
 * // Example 6: Invalid input (not a matrix)
 * assert.throws(() => isrow(5), /Input must be a non-empty matrix/);
 *
 * // Example 7: Empty matrix (should throw an error)
 * assert.throws(() => isrow([]), /Input must be a non-empty matrix/);

 * ```*/
export default function isrow(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  return nrows === 1 && ncols >= 1;
}

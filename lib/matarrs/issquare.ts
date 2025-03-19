/**
 * @function issquare
 * @summary Checks if the input is a square matrix.
 * @description Returns `true` if the input matrix has the same number of rows and columns, otherwise returns `false`.
 *
 * @param {array} x - The input matrix to check.
 * @returns {boolean} - Returns `true` if `x` is a square matrix, otherwise `false`.
 *
 * @throws {Error} - Throws an error if no arguments are provided or if the input is not a valid matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Valid square matrix
 * assertEquals(issquare([[9, 5], [6, 1]]), true);
 *
 * // Example 2: Non-square matrix (more rows than columns)
 * assertEquals(issquare([[9, 5], [6, 1], [7, 8]]), false);
 *
 * // Example 3: Non-square matrix (more columns than rows)
 * assertEquals(issquare([[9, 5, 3], [6, 1, 7]]), false);
 *
 * // Example 4: Single element (1x1 matrix)
 * assertEquals(issquare([[9]]), true);
 *
 * // Example 5: Empty matrix (should throw an error)
 * assert.throws(() => { issquare([]) }, Error);
 *
 * // Example 6: Invalid input (not a matrix)
 * assert.throws(() => { issquare(123) }, Error);

 * ```*/
export default function issquare(x: any) {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x) || x.length === 0 || !Array.isArray(x[0])) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  if (!x.every((row) => Array.isArray(row) && row.length === ncols)) {
    return false;
  }

  return nrows === ncols;
}

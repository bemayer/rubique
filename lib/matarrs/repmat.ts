/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function repmat
 * @summary Replicate and tile an array or matrix
 * @description Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param {number|boolean|array|matrix} x The value, array, or matrix to replicate.
 * @param {number} m Number of times to repeat along the rows.
 * @param {number} [n=m] Number of times to repeat along the columns.
 * @returns {matrix} The resulting replicated matrix.
 * @throws {Error} If insufficient arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Replicate a scalar value into a 3x3 matrix
 * assert.deepStrictEqual(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * // Example 2: Replicate a scalar into a 3x2 matrix
 * assert.deepStrictEqual(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * // Example 3: Replicate a row vector
 * assert.deepStrictEqual(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * // Example 4: Replicate a 2x2 matrix
 * assert.deepStrictEqual(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * // Example 5: Replicate a column vector
 * assert.deepStrictEqual(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * // Example 6: Single-element matrix repeated
 * assert.deepStrictEqual(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * // Example 7: Boolean replication
 * assert.deepStrictEqual(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * // Example 8: Replicating a single-element array
 * assert.deepStrictEqual(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);

 * ```*/
export default function repmat(x: any, m: any, n = m) {
  if (m === undefined) {
    throw new Error("Not enough input arguments");
  }

  const matrix = toMatrix(x);
  const rows = matrix.length;
  const cols = matrix[0].length;

  return Array.from(
    { length: rows * m },
    (_, i) =>
      Array.from({ length: cols * n }, (_, j) => matrix[i % rows][j % cols]),
  );
}

function toMatrix(x: any) {
  if (!Array.isArray(x)) {
    return [[x]];
  }

  if (!Array.isArray(x[0])) {
    return [x];
  }

  return x;
}

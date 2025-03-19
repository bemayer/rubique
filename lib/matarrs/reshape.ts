import { array, matrix } from "../types.d.ts";
import { flatten } from "../../index.ts";

/**
 * @function reshape
 * @summary Reshape an array or matrix into a new matrix of given dimensions.
 * @description Rearranges elements of an array or matrix into a new shape while preserving order.
 *
 * @param {} x The array or matrix to reshape.
 * @param {number} m Number of rows for the new matrix.
 * @param {number} n Number of columns for the new matrix.
 * @param {number} [flag=0] Flag (0: row-wise, 1: column-wise).
 * @returns {matrix} The reshaped matrix.
 * @throws {Error} If dimensions are invalid or inconsistent.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Reshape a row vector into a column vector
 * assert.deepStrictEqual(reshape([5, 6, 3], 3, 1), [[5], [6], [3]]);
 *
 * // Example 2: Reshape a column vector into a row vector
 * assert.deepStrictEqual(reshape([5, 6, 3], 1, 3), [[5, 6, 3]]);
 *
 * // Example 3: Reshape a 2x3 matrix into a 3x2 matrix (row-wise)
 * assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2), [[-1, 3], [-1, 4], [5, 9]]);
 *
 * // Example 4: Reshape a 2x3 matrix into a 3x2 matrix (column-wise)
 * assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2, 1), [[-1, 3], [-1, 4], [5, 9]]);
 *
 * // Example 5: Reshape into a single-column matrix
 * assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1), [[-1], [3], [-1], [4], [5], [9]]);
 *
 * // Example 6: Reshape into a single-column matrix (column-wise)
 * assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1, 1), [[-1], [3], [-1], [4], [5], [9]]);

 * ```*/
export default function reshape(
  x: array | matrix,
  m: number,
  n: number,
  flag: number = 0,
): matrix {
  if (m === undefined || n === undefined) {
    throw new Error("Not enough input arguments");
  }
  if (!Number.isInteger(m) || !Number.isInteger(n)) {
    throw new Error("Dimensions must be integer numbers");
  }

  const matrix = toMatrix(x);
  const originalSize = matrix.length * matrix[0].length;
  const newSize = m * n;

  if (originalSize !== newSize) {
    throw new Error("Total number of elements must be the same");
  }

  const flattened = flatten(matrix, flag) as number[];

  return Array.from(
    { length: m },
    (_, i) => flattened.slice(i * n, (i + 1) * n),
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

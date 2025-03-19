/** @import { array, matrix } from '../types.d.ts' */
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import zeros from "../matarrs/zeros.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function diag
 * @summary Diagonal matrix creation and extraction of diagonals from a matrix.
 * @description For an input vector, creates a diagonal matrix. For a matrix input, extracts the k-th diagonal (0: main diagonal, k > 0: above main diagonal, k < 0: below main diagonal).
 *
 * @param {array|matrix} x Input array or matrix.
 * @param {number} [k=0] Index of the diagonal (0: main diagonal, k > 0 above, k < 0 below). Defaults to 0.
 * @returns {array|matrix} Diagonal matrix or array of diagonal values.
 * @throws {Error} If the input is neither a vector nor a matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create a diagonal matrix from a vector
 * diag([5, 6, -3]); // [[5, 0, 0], [0, 6, 0], [0, 0, -3]]
 *
 * // Example 2: Create a diagonal matrix with k = 1
 * diag([5, 6, -3], 1); // [[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]]
 *
 * // Example 3: Create a diagonal matrix with k = -1
 * diag([5, 6, -3], -1); // [[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]]
 *
 * // Example 4: Extract the main diagonal from a matrix
 * diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]]); // [5, 6, -3]
 *
 * // Example 5: Extract the first superdiagonal from a matrix
 * diag([[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]], 1); // [5, 6, -3]
 *
 * // Example 6: Extract the first subdiagonal from a matrix
 * diag([[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]], -1); // [5, 6, -3]
 *
 * // Example 7: Extract a diagonal out of bounds (diagonal 2)
 * diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]], 2); // [0]

 * ```*/
export default function diag(x: any, k = 0) {
  const absK = Math.abs(k);

  if (isarray(x)) {
    // Create a diagonal matrix from a vector
    const n = x.length;
    const matrixSize = n + absK;
    const out = zeros(matrixSize, matrixSize);

    for (let i = 0; i < n; i++) {
      if (k >= 0) {
        out[i][i + absK] = x[i];
      } else {
        out[i + absK][i] = x[i];
      }
    }

    return out;
  }

  if (ismatrix(x)) {
    // Extract the k-th diagonal from a matrix
    const rows = nrows(x);
    const out = [];

    for (let i = 0; i < rows - absK; i++) {
      if (k >= 0) {
        out.push(x[i][i + absK]);
      } else {
        out.push(x[i + absK][i]);
      }
    }

    return out;
  }

  throw new Error("unknown input");
}

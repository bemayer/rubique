/** @import { matrix } from '../types.d.ts' */

import clone from "../matarrs/clone.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import zeros from "../matarrs/zeros.ts";

/**
 * @function lu
 * @summary LU decomposition with partial pivoting.
 * @description Performs LU decomposition of the input matrix `x` using the Doolittle algorithm with partial pivoting.
 * Returns the combined LU matrix, lower triangular matrix `L`, upper triangular matrix `U`, pivot vector `P`, and pivot sign `S`.
 *
 * @param {matrix} x The input matrix.
 * @returns {{
 *   LU: matrix;  // Combined LU matrix
 *   L: matrix;   // Lower triangular matrix
 *   U: matrix;   // Upper triangular matrix
 *   P: array;    // Pivot vector (zero-based)
 *   S: number;   // Pivot sign (+1 or -1)
 * }}
 * @throws {Error} If no input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: LU decomposition of a 2x2 square matrix
 * assert.deepStrictEqual(lu([[3, 2], [5, 2]]), {
 *   LU: [
 *     [5, 2],
 *     [0.6, 0.8]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.6, 1]
 *   ],
 *   U: [
 *     [5, 2],
 *     [0, 0.8]
 *   ],
 *   P: [1, 0],
 *   S: -1
 * });
 *
 * // Example 2: LU decomposition of a 3x3 square matrix
 * assert.deepStrictEqual(lu([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), {
 *   LU: [
 *     [2, 3, 1],
 *     [0.5, -3.5, 2.5],
 *     [0.5, -0.42857142857142855, -0.7142857142857143]
 *   ],
 *   L: [
 *     [1, 0, 0],
 *     [0.5, 1, 0],
 *     [0.5, -0.42857142857142855, 1]
 *   ],
 *   U: [
 *     [2, 3, 1],
 *     [0, -3.5, 2.5],
 *     [0, 0, -0.7142857142857143]
 *   ],
 *   P: [2, 0, 1],
 *   S: 1
 * });
 *
 * // Example 3: LU decomposition of a 2x3 rectangular matrix
 * assert.deepStrictEqual(lu([[5, 6, 5], [7, 8, -1]]), {
 *   LU: [
 *     [7, 8, -1],
 *     [0.714286, 0.285714, 5.714286]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.714286, 1]
 *   ],
 *   U: [
 *     [7, 8, -1],
 *     [0, 0.285714, 5.714286]
 *   ],
 *   P: [1, 0],
 *   S: -1
 * });
 *
 * // Example 4: LU decomposition of a singular 3x3 matrix
 * assert.deepStrictEqual(lu([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), {
 *   LU: [
 *     [7, 8, 9],
 *     [0.142857, 0.857143, 1.285714],
 *     [0.571429, 0.5, 0]
 *   ],
 *   L: [
 *     [1, 0, 0],
 *     [0.571429, 1, 0],
 *     [0.142857, 0.5, 1]
 *   ],
 *   U: [
 *     [7, 8, 9],
 *     [0, 0.857143, 1.285714],
 *     [0, 0, 0]
 *   ],
 *   P: [2, 0, 1],
 *   S: 1
 * });
 *
 * // Example 5: LU decomposition of a 3x2 rectangular matrix
 * assert.deepStrictEqual(lu([[1, 2], [3, 4], [5, 6]]), {
 *   LU: [
 *     [5, 6],
 *     [0.6, 0.4],
 *     [0.2, 0]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.6, 1],
 *     [0.2, 0]
 *   ],
 *   U: [
 *     [5, 6],
 *     [0, 0.4],
 *     [0, 0]
 *   ],
 *   P: [2, 1, 0],
 *   S: 1
 * });
 *
 * // Example 6: Error when input is not provided
 * assert.throws(() => lu(), Error, 'not enough input arguments');

 * ```*/
export default function lu(x: any) {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const m = nrows(x); // Number of rows
  const n = ncols(x); // Number of columns
  const A = clone(x); // Clone the input matrix to avoid mutating it
  const piv = Array.from({ length: m }, (_, i) => i); // Initialize pivot vector (zero-based)
  let pivsign = 1; // Sign of the permutation

  for (let j = 0; j < Math.min(m, n); j++) {
    // Find the pivot element in the current column
    let maxIndex = j;
    for (let i = j + 1; i < m; i++) {
      if (Math.abs(A[i][j]) > Math.abs(A[maxIndex][j])) {
        maxIndex = i;
      }
    }

    // Swap rows in A and update the pivot vector if needed
    if (maxIndex !== j) {
      swapRows(A, maxIndex, j, n); // Swap rows in A
      [piv[maxIndex], piv[j]] = [piv[j], piv[maxIndex]]; // Update the pivot vector
      pivsign = -pivsign; // Flip the sign of the permutation
    }

    // Perform elimination below the pivot
    if (A[j][j] !== 0) {
      for (let i = j + 1; i < m; i++) {
        A[i][j] /= A[j][j];
        for (let k = j + 1; k < n; k++) {
          A[i][k] -= A[i][j] * A[j][k];
        }
      }
    }
  }

  return {
    LU: A, // Combined LU matrix
    L: extractLowerTriangular(A),
    U: extractUpperTriangular(A),
    P: piv, // Pivot vector (zero-based)
    S: pivsign, // Pivot sign
  };
}

/**
 * Swaps two rows in a matrix.
 * @param {matrix} A The matrix.
 * @param {number} row1 The index of the first row.
 * @param {number} row2 The index of the second row.
 * @param {number} n The number of columns.
 */
function swapRows(A: any, row1: any, row2: any, n: any) {
  for (let k = 0; k < n; k++) {
    const temp = A[row1][k];
    A[row1][k] = A[row2][k];
    A[row2][k] = temp;
  }
}

/**
 * Extracts the lower triangular matrix from the LU matrix.
 * @param {matrix} LU The LU matrix.
 * @returns {matrix} The lower triangular matrix.
 */
function extractLowerTriangular(LU: any) {
  const m = nrows(LU);
  const n = ncols(LU);
  const L = zeros(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j <= i && j < n; j++) {
      L[i][j] = i === j ? 1 : LU[i][j];
    }
  }
  return L;
}

/**
 * Extracts the upper triangular matrix from the LU matrix.
 * @param {matrix} LU The LU matrix.
 * @returns {matrix} The upper triangular matrix.
 */
function extractUpperTriangular(LU: any) {
  const m = nrows(LU);
  const n = ncols(LU);
  const U = zeros(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = i; j < n; j++) {
      U[i][j] = LU[i][j];
    }
  }
  return U;
}

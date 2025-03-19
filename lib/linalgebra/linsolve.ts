/** @import { array, matrix } from '../types.d.ts' */

import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import issquare from "../matarrs/issquare.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import lu from "./lu.ts";
import issingular from "../datatype/issingular.ts";
import subset from "../matarrs/subset.ts";
import colon from "../matarrs/colon.ts";
import transpose from "../matarrs/transpose.ts";
import getcol from "../matarrs/getcol.ts";
import { matrix } from "../types.d.ts";

/**
 * @function linsolve
 * @summary Solve a linear system of equations Ax = b.
 * @description Solves the linear system of equations Ax = b using LU factorization with row pivoting.
 *
 * @param {matrix} A A square matrix.
 * @param {array|matrix} b A vector or matrix.
 * @returns {array|matrix} The solution to the linear system.
 * @throws {Error} If not enough input arguments are provided.
 * @throws {Error} If matrix dimensions do not agree.
 * @throws {Error} If the matrix is not square.
 * @throws {Error} If the matrix is singular.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Solve a linear system with a vector
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], transpose([5, 6, 3]));
 * // [5.846154, -2.384615, -1.538462]
 *
 * // Example 2: Solve a linear system with a matrix
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [[4], [-6], [7]]);
 * // [1, 2, -1]
 *
 * // Example 3: Solve a linear system with an identity matrix
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], eye(3));
 * // [[0.846154, 0.307692, -0.0769231], [-0.384615, -0.230769, 0.307692], [-0.538462, 0.0769231, 0.230769]]

 * ```*/
export default function linsolve(A: any, b: any) {
  if (arguments.length < 2) {
    throw new Error("Not enough input arguments");
  }

  if (!issquare(A)) {
    throw new Error("Matrix must be square");
  }

  if (isarray(b)) {
    // Convert vector `b` into a column matrix
    b = transpose(b);
  }

  if (nrows(A) !== nrows(b)) {
    throw new Error("Matrix dimensions must agree");
  }

  const lud = lu(A);

  if (issingular(lud.LU)) {
    throw new Error("Matrix is singular");
  }

  const LU = lud.LU;
  const P = lud.P;

  // Handle `b` permutation
  const permutedB = ismatrix(b)
    ? subset(b, P, colon(0, ncols(b) - 1))
    : subset(b, P);

  // Solve for each column of `b`
  const result: matrix = [];
  for (let i = 0; i < ncols(permutedB); i++) {
    const col = getcol(permutedB, i);
    const solvedCol = solve(LU, col);
    result.push(solvedCol);
  }

  // Return as flat array if input `b` was a vector, otherwise return as a matrix
  return ncols(b) === 1 ? result.flat() : transpose(result);
}

/**
 * Helper function to solve a linear system given LU decomposition.
 * @param {matrix} LU The LU matrix from LU decomposition.
 * @param {array} b The vector to solve for.
 * @returns {array} The solution vector.
 */
function solve(LU: any, b: any) {
  const n = nrows(LU);
  const x = [...b];

  // Forward substitution: Solve Ly = b
  for (let i = 1; i < n; i++) {
    let sum = x[i];
    for (let j = 0; j < i; j++) {
      sum -= LU[i][j] * x[j];
    }
    x[i] = sum;
  }

  // Back substitution: Solve Ux = y
  x[n - 1] /= LU[n - 1][n - 1];
  for (let i = n - 2; i >= 0; i--) {
    let sum = x[i];
    for (let j = i + 1; j < n; j++) {
      sum -= LU[i][j] * x[j];
    }
    x[i] = sum / LU[i][i];
  }

  return x;
}

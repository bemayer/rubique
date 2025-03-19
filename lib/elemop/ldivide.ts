/** @import { array, matrix } from '../types.d.ts' */

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import isarray from "../datatype/isarray.ts";
import getrow from "../matarrs/getrow.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function ldivide
 * @summary Left array division X. \ Y
 * @description Divides each element of Y by the corresponding element of X. Inputs X and Y must have the same size.
 *
 * @param {number|array|matrix} x Number or array of values.
 * @param {number|array|matrix} y Number or array of values.
 * @returns {number|array|matrix} Result of the division.
 * @throws {Error} If fewer than two arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single number division
 * assertEquals(ldivide(5, 10), 2);
 *
 * // Example 2: Scalar divided by array
 * assert.deepStrictEqual(ldivide([1, 2, 3], 6), [6, 3, 2]);
 *
 * // Example 3: Scalar divided by array with negative numbers
 * assert.deepStrictEqual(ldivide(2, [-12, -8, -4]), [-6, -4, -2]);
 *
 * // Example 4: Element-wise division of two arrays
 * assert.deepStrictEqual(ldivide([5, 10, 3], [10, 20, 30]), [2, 2, 10]);
 *
 * // Example 5: Element-wise division of two matrices
 * assert.deepStrictEqual(ldivide([[5, 5], [6, 1]], [[10, 2], [6, 2]]), [[2, 0.4], [1, 2]]);
 *
 * // Example 6: Scalar divided by matrix
 * assert.deepStrictEqual(ldivide([[3, 5], [6, 1]], 3), [[1, 0.6], [0.5, 3]]);

 * ```*/
export default function ldivide(x: any, y: any) {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const divide = (a: any, b: any) => b / a;

  if (isnumber(x) || isnumber(y)) {
    return handleNumberDivision(x, y, divide);
  }

  if (isarray(x) && isarray(y)) {
    return handleArrayDivision(x, y, divide);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return handleMatrixDivision(x, y, divide);
  }

  throw new Error("types not supported");
}

function handleNumberDivision(x: any, y: any, divide: any) {
  if (isnumber(x)) {
    return isnumber(y)
      ? divide(x, y)
      : arrayfun(y, (val: any) => divide(x, val));
  }

  return ismatrix(x)
    ? x.map((row: any) => arrayfun(row, (val: any) => divide(val, y)))
    : arrayfun(x, (val: any) => divide(val, y));
}

function handleArrayDivision(x: any, y: any, divide: any) {
  if (x.length !== y.length) {
    throw new Error("input dimensions must agree");
  }
  return x.map((xi: any, i: any) => divide(xi, y[i]));
}

function handleMatrixDivision(x: any, y: any, divide: any) {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("input dimensions must agree");
  }
  return x.map((row: any, i: any) =>
    handleArrayDivision(row, getrow(y, i), divide)
  );
}

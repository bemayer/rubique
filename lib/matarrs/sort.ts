import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import vectorfun from "../datatype/vectorfun.ts";
import mergesort from "./mergesort.ts";

/**
 * @function sort
 * @summary Sorts an array or matrix in ascending or descending order.
 * @description If input is a 1D array, it is sorted normally. If input is a matrix, sorting can be done along rows or columns.
 *
 * @param {array|matrix} x The array or matrix to sort.
 * @param {string} [mode='ascend'] Sorting order: `'ascend'` or `'descend'`.
 * @param {number} [dim=1] Dimension along which to sort (0: rows, 1: columns).
 * @returns {array|matrix} The sorted array or matrix.
 * @throws {Error} If input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sort an array in ascending order
 * assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], 'ascend'), [-4, -1, 0, 0, 3, 5, 9]);
 *
 * // Example 2: Sort an array in descending order
 * assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], 'descend'), [9, 5, 3, 0, 0, -1, -4]);
 *
 * // Example 3: Sort rows in descending order
 * assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], 'descend', 1), [
 *   [3, -1, -1],
 *   [9, 5, 4]
 * ]);
 *
 * // Example 4: Sort columns in ascending order
 * assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], 'ascend', 0), [
 *   [-1, 3, -1],
 *   [4, 5, 9]
 * ]);
 *
 * // Example 5: Invalid sorting mode
 * assert.throws(() => sort([1, 2, 3], 'wrong'), /Sorting mode must be "ascend" or "descend"./);
 *
 * // Example 6: Invalid matrix input
 * assert.throws(() => sort(5), /Input must be an array or matrix./);

 * ```*/
export default function sort(x: any, mode = "ascend", dim = 1) {
  if (!x) {
    throw new Error("Not enough input arguments.");
  }

  const _sort = (a: any, mode: any) => mergesort(a, mode)[0];

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return _sort(x, mode);
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a number, an array or matrix.");
  }

  return vectorfun(dim, x, _sort, mode);
}

import type { array, numarraymatrix } from "../types.d.ts";

import arrayfun from "../datatype/arrayfun.ts";
import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import getrow from "../matarrs/getrow.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function minus
 * @summary Subtracts one number, array, or matrix from another.
 * @description Subtracts Y from X. X and Y must have the same dimensions unless one is a number.
 *
 * @param x The left-hand operand.
 * @param y The right-hand operand.
 * @returns The result of the subtraction.
 * @throws {Error} If input dimensions do not agree.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Subtract two numbers
 * assertEquals(minus(5, 6), -1);
 *
 * // Example 2: Subtract two arrays
 * assertEquals(minus([5, 6, 4], [3, -1, 0]), [2, 7, 4]);
 *
 * // Example 3: Subtract a number from an array
 * assertEquals(minus([5, 6, 4], 10), [-5, -4, -6]);
 *
 * // Example 4: Subtract two matrices
 * assertEquals(minus([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]), [[6, 3, 6], [3, 3, -10]]);
 * ```
 */
export default function minus(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(x)) {
    return isnumber(y) ? x - y : arrayfun(y, (val: any) => x - val) as array;
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: any) => val - y) as numarraymatrix;
  }

  if (isarray(x) && isarray(y)) {
    return x.map((xi: any, i: number) => xi - (y[i] as number));
  }

  if (ismatrix(x) && ismatrix(y)) {
    if (nrows(x) !== nrows(y) || ncols(x) !== ncols(y)) {
      throw new Error("input dimensions must agree");
    }
    return x.map((row: any, i: any) =>
      minus(row, getrow(y, i))
    ) as numarraymatrix;
  }

  throw new Error("Invalid input types");
}

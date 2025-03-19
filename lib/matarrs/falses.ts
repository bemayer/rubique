/** @import { array, matrix } from '../types.d.ts' */

import isarray from "../datatype/isarray.ts";

/**
 * @function falses
 * @summary Creates an array or matrix filled with `false`.
 * @description Generates an array or matrix filled with the boolean value `false`. It accepts up to two dimensions.
 *
 * @param {number|array} args Variable input arguments (max 2). If a single value is provided, a square matrix is created.
 * @returns {array|matrix} An array or matrix of `false` values.
 * @throws {Error} If no input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create an empty array (0x0 matrix)
 * console.log(falses(0)); // []
 *
 * // Example 2: Create a 1x1 matrix of `false`
 * console.log(falses(1)); // [ [ false ] ]
 *
 * // Example 3: Create a 2x2 matrix of `false`
 * console.log(falses(2)); // [ [ false, false ], [ false, false ] ]
 *
 * // Example 4: Create a 2x1 matrix of `false`
 * console.log(falses([2, 1])); // [ [ false ], [ false ] ]
 *
 * // Example 5: Create a 2x3 matrix of `false`
 * console.log(falses(2, 3)); // [ [ false, false, false ], [ false, false, false ] ]

 * ```*/
export default function falses(...args: any[]) {
  if (args.length === 0) {
    throw new Error("Not enough input arguments");
  }

  let rows, cols;

  if (args.length === 1) {
    if (isarray(args[0])) {
      [rows, cols] = args[0];
    } else {
      rows = cols = args[0];
    }
  } else if (args.length === 2) {
    [rows, cols] = args;
  } else {
    throw new Error("Invalid input arguments");
  }

  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    result.push(row);
  }

  return result;
}

/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function rand
 * @summary Uniformly distributed pseudorandom numbers
 * @description Generates uniformly distributed pseudorandom numbers. It can return:
 * - A single random number if no arguments are provided.
 * - A 2D array of random numbers if dimensions are provided.
 *
 * @param {...number|array<number>} args Variable input arguments (max 2).
 * @returns {number|array<number>} A random number or a matrix of random numbers.
 * @throws {Error} If invalid arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single random number
 * assertEquals(typeof rand(), 'number');
 *
 * // Example 2: Empty matrix
 * assert.deepStrictEqual(rand(0), []);
 *
 * // Example 3: 1x1 matrix
 * const result1x1 = rand(1);
 * assertEquals(result1x1.length, 1);
 * assertEquals(result1x1[0].length, 1);
 *
 * // Example 4: 2x2 matrix
 * const result2x2 = rand(2);
 * assertEquals(result2x2.length, 2);
 * assertEquals(result2x2[0].length, 2);
 *
 * // Example 5: 2x1 matrix
 * const result2x1 = rand([2, 1]);
 * assertEquals(result2x1.length, 2);
 * assertEquals(result2x1[0].length, 1);
 *
 * // Example 6: 1x2 matrix
 * const result1x2 = rand(1, 2);
 * assertEquals(result1x2.length, 1);
 * assertEquals(result1x2[0].length, 2);

 * ```*/
export default function rand(...args: any[]) {
  if (args.length === 0) {
    return Math.random();
  } else if (args.length === 1) {
    const arg = args[0];
    if (typeof arg === "number") {
      return rand_mat(arg, arg);
    } else if (Array.isArray(arg)) {
      return rand_mat(arg[0], arg[1]);
    } else {
      throw new Error("unknown input type");
    }
  } else if (args.length === 2) {
    const [rows, cols] = args;
    if (typeof rows === "number" && typeof cols === "number") {
      return rand_mat(rows, cols);
    } else {
      throw new Error("unknown input type");
    }
  } else {
    throw new Error("too many input arguments");
  }
}

function rand_mat(rows: any, cols: any) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.random());
    }
    result.push(row);
  }
  return result;
}

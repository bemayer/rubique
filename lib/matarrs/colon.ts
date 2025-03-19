/** @import { array } from '../types.d.ts' */

/**
 * @function colon
 * @summary Generates an array of numbers from start to end with a specified step.
 * @description Creates an array of numbers starting from `start`, ending at `end`, and incrementing by `step`. If `step` is not provided, it defaults to 1.
 *
 * @param {number} start The starting value of the array.
 * @param {number} end The ending value of the array.
 * @param {number} [step=1] The step value between elements.
 * @returns {array} An array of numbers from `start` to `end` with a step of `step`.
 * @throws {Error} If less than 2 arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Generate array from 1 to 10 with step 1
 * console.log(colon(1, 10, 1)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * // Example 2: Generate array from 10 to 1 with step 1 (should return empty array)
 * console.log(colon(10, 1, 1)); // []
 *
 * // Example 3: Generate array from -5 to 5 with step 2
 * console.log(colon(-5, 5, 2)); // [-5, -3, -1, 1, 3, 5]
 *
 * // Example 4: Generate array from -7 to 14 with step 2
 * console.log(colon(-7, 14, 2)); // [-7, -5, -3, -1, 1, 3, 5, 7, 9, 11, 13]

 * ```*/
export default function colon(start: any, end: any, step = 1) {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  if (step === 0 || (step > 0 && start > end) || (step < 0 && start < end)) {
    return [];
  }

  const result = [];
  for (let i = start; (step > 0 ? i <= end : i >= end); i += step) {
    result.push(i);
  }

  return result;
}

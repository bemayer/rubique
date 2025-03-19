import cat from "./cat.ts";

/**
 * @function vertcat
 * @summary Concatenates arrays or matrices vertically.
 * @description Combines multiple arrays or matrices by stacking them vertically.
 *              Supports multiple input arguments.
 *
 * @param {...(array|matrix|number)} args Variable arguments (args1, args2, ...).
 * @returns {array|matrix} The vertically concatenated matrix.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Concatenate two matrices
 * assert.deepStrictEqual(vertcat([[5,6,5],[7,8,-1]],[[-1,3,-1],[4,5,9]]),
 *   [[5, 6, 5], [7, 8, -1], [-1, 3, -1], [4, 5, 9]]);
 *
 * // Example 2: Concatenate single numbers
 * assert.deepStrictEqual(vertcat(5,7,9,8), [[5], [7], [9], [8]]);
 *
 * // Example 3: Concatenate row vectors
 * assert.deepStrictEqual(vertcat([1,2,3],[4,5,6]), [[1,2,3], [4,5,6]]);
 *
 * // Example 4: Concatenate column vectors
 * assert.deepStrictEqual(vertcat([[1],[2],[3]], [[4],[5],[6]]), [[1], [2], [3], [4], [5], [6]]);
 *
 * // Example 5: Invalid input (no arguments)
 * assert.throws(() => vertcat(), /Not enough input arguments./);

 * ```*/
export default function vertcat(...args: any[]) {
  if (args.length === 0) {
    throw new Error("Not enough input arguments.");
  }

  return cat(0, ...args);
}

import ismatrix from "../datatype/ismatrix.ts";

/**
 * @function ones
 * @summary Create an array of all ones
 * @description Creates a matrix or array filled with ones based on the provided dimensions.
 * Accepts up to two arguments for dimensions or a single array defining the dimensions.
 *
 * @param {...number|array<number>} args Variable input arguments (max 2).
 * @returns {array|matrix} A matrix or array filled with ones.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create a 0x0 matrix
 * assert.deepStrictEqual(ones(0), []);
 *
 * // Example 2: Create a 1x1 matrix
 * assert.deepStrictEqual(ones(1), [[1]]);
 *
 * // Example 3: Create a 2x2 matrix
 * assert.deepStrictEqual(ones(2), [[1, 1], [1, 1]]);
 *
 * // Example 4: Create a 2x1 matrix
 * assert.deepStrictEqual(ones([2, 1]), [[1], [1]]);
 *
 * // Example 5: Create a 2x3 matrix
 * assert.deepStrictEqual(ones(2, 3), [[1, 1, 1], [1, 1, 1]]);

 * ```*/
export default function ones(...args: any[]) {
  if (args.length === 0) {
    throw new Error("not enough input arguments");
  }

  let _args = args;
  if (ismatrix(_args)) {
    _args = _args[0];
  }

  if (_args.length === 1) {
    _args = [_args[0], _args[0]];
  }

  const rows = _args[0];
  const cols = _args[1];

  if (rows === 0 || cols === 0) {
    return [];
  }

  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(1);
    }
    result.push(row);
  }

  return result;
}

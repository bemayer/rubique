import size from "./size.ts";

/**
 * @function length
 * @summary Gets the length of a vector or the largest array dimension.
 * @description Returns the length of a vector or the largest dimension of a 2D array (matrix).
 *
 * @param {array|matrix|any} x The input array, matrix, or element.
 * @returns {number} Returns the length of the vector or the largest dimension of the array/matrix.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Length of a 1D array (vector)
 * assertEquals(length([3, 5, 6]), 3);
 *
 * // Example 2: Length of a single element (should be 1)
 * assertEquals(length(5), 1);
 *
 * // Example 3: Length of a 2D array (matrix)
 * assertEquals(length([[5, 4], [-1, 2]]), 2);
 *
 * // Example 4: Empty array (should be 0)
 * assertEquals(length([]), 0);

 * ```*/
export default function length(x: any) {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const dims = size(x);
  return Math.max(...dims);
}

/**
 * @function linspace
 * @summary Create linearly spaced arrays
 * @description Creates an array of `n` linearly spaced points between `a` and `b`, inclusive.
 *
 * @param {number} a The lower bound.
 * @param {number} b The upper bound.
 * @param {number} [n=10] The number of points to generate. Defaults to 10 if not provided.
 * @returns {array} An array of `n` linearly spaced points between `a` and `b`.
 * @throws {Error} If fewer than 2 arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Generate 5 linearly spaced points between 1 and 10
 * assert.deepStrictEqual(linspace(1, 10, 5), [1, 3.25, 5.5, 7.75, 10]);
 *
 * // Example 2: Generate 3 linearly spaced points between -10 and 10
 * assert.deepStrictEqual(linspace(-10, 10, 3), [-10, 0, 10]);
 *
 * // Example 3: Generate 2 linearly spaced points between -5 and 5
 * assert.deepStrictEqual(linspace(-5, 5, 2), [-5, 5]);
 *
 * // Example 4: Generate a single point (n = 1), should return only the upper bound
 * assert.deepStrictEqual(linspace(2, 5, 1), [5]);
 *
 * // Example 5: Generate 10 linearly spaced points between 0 and 1
 * assert.deepStrictEqual(
 *   linspace(0, 1),
 *   [0, 0.1111111111111111, 0.2222222222222222, 0.3333333333333333, 0.4444444444444444, 0.5555555555555556, 0.6666666666666666, 0.7777777777777777, 0.8888888888888888, 1]
 * );
 *
 * // Example 6: Throw an error when fewer than 2 arguments are provided
 * assert.throws(() => linspace(1), {
 *   name: 'Error',
 *   message: 'Not enough input arguments',
 * });

 * ```*/
export default function linspace(a: any, b: any, n = 10) {
  if (arguments.length < 2) {
    throw new Error("Not enough input arguments");
  }

  if (n <= 1) {
    return [b];
  }

  const step = (b - a) / (n - 1);
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(a + step * i);
  }
  return result;
}

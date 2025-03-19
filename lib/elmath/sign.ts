/**
 * @function sign
 * @summary Computes the sign of a number.
 * @description Computes the sign of each element in a number, array, or matrix.
 * Returns 1 for positive numbers, -1 for negative numbers, and 0 for zero.
 *
 * @param x The input value(s).
 * @returns The sign of the input value(s).
 * @throws If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sign of a single number
 * assertEquals(sign(-0.5), -1);
 *
 * // Example 2: Sign of a positive number
 * assertEquals(sign(42), 1);
 *
 * // Example 3: Sign of zero
 * assertEquals(sign(0), 0);
 *
 * // Example 4: Sign with special values
 * assertEquals(sign(Infinity), 1);
 * assertEquals(sign(-Infinity), -1);
 *
 * // Example 5: Sign with very small numbers
 * assertEquals(sign(0.000001), 1);
 * assertEquals(sign(-0.000001), -1);
 *
 * // Example 6: Using with arrayfun for arrays
 * import { arrayfun } from "../../index.ts";
 * assertEquals(arrayfun([5, 0, -3], sign), [1, 0, -1]);
 *
 * // Example 7: Using with arrayfun for matrices
 * assertEquals(arrayfun([[2, -1], [0, 4]], sign), [[1, -1], [0, 1]]);
 * ``` */
export default function sign(x: number): number {
  if (x > 0) return 1;
  if (x < 0) return -1;
  return 0;
}

import isnumber from "./isnumber.ts";

/**
 * @function isinteger
 * @summary Checks if the input is an integer.
 * @description Returns `true` if the input is a number and is an integer (i.e., has no fractional part).
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is an integer.
 *
 * @throws If the number of input arguments is not 1.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: An integer
 * assertEquals(isinteger(5), true);
 *
 * // Example 2: A non-integer number
 * assertEquals(isinteger(5.5), false);
 *
 * // Example 3: Not a number (string)
 * assertEquals(isinteger("5"), false);
 *
 * // Example 4: Not a number (null)
 * assertEquals(isinteger(null), false);

 * ```*/
export default function isinteger(x: unknown): boolean {
  return isnumber(x) && Math.round(x) === x;
}

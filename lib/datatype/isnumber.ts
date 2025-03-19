/**
 * @function isnumber
 * @summary True for number
 * @description Returns `true` if the input is a number or `NaN`, otherwise `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is a number or `NaN`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Input is a number
 * assertEquals(isnumber(5), true);
 *
 * // Example 2: Input is `NaN`
 * assertEquals(isnumber(NaN), true);
 *
 * // Example 3: Input is a string representing a number (not a number)
 * assertEquals(isnumber('5'), false);
 *
 * // Example 4: Input is `undefined`
 * assertEquals(isnumber(undefined), false);
 *
 * // Example 5: Input is `null`
 * assertEquals(isnumber(null), false);

 * ```*/
export default function isnumber(x: unknown): x is number {
  return typeof x === "number";
}

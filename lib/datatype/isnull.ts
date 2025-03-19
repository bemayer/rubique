/**
 * @function isnull
 * @summary True for null values
 * @description Returns `true` if the input is `null`, otherwise `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is `null`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Input is `null`
 * assertEquals(isnull(null), true);
 *
 * // Example 2: Input is `undefined`
 * assertEquals(isnull(undefined), false);
 *
 * // Example 3: Input is a number (not `null`)
 * assertEquals(isnull(0), false);
 *
 * // Example 4: Input is an empty string (not `null`)
 * assertEquals(isnull(''), false);

 * ```*/
export default function isnull(x: unknown): boolean {
  return x === null;
}

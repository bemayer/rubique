/**
 * @function isundefined
 * @summary Checks if the input is undefined.
 * @description Returns `true` if the input is strictly equal to `undefined`, otherwise returns `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Input is undefined
 * assertEquals(isundefined(undefined), true);
 *
 * // Example 2: Input is defined (null)
 * assertEquals(isundefined(null), false);
 *
 * // Example 3: Input is defined (string)
 * assertEquals(isundefined('test'), false);
 * ``` */
export default function isundefined(x: unknown): x is undefined {
  return x === undefined;
}

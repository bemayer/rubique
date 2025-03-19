/**
 * @function islogical
 * @summary Checks if the input is a boolean.
 * @description Returns `true` if the input is of type `boolean`.
 *
 * @param x - The input to check.
 * @returns Returns `true` if `x` is a boolean.
 *
 * @throws {Error} - Throws an error if no argument is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Boolean true
 * assertEquals(islogical(true), true);
 *
 * // Example 2: Boolean false
 * assertEquals(islogical(false), true);
 *
 * // Example 3: Not a boolean (number)
 * assertEquals(islogical(1), false);
 *
 * // Example 4: Not a boolean (string)
 * assertEquals(islogical("true"), false);

 * ```*/
// deno-lint-ignore no-explicit-any
export default function islogical(x: any) {
  return typeof x === "boolean";
}

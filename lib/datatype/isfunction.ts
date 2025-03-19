/**
 * @function isfunction
 * @summary Checks if the input is a function.
 * @description Returns `true` if the input is of type `function`.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a function.
 *
 * @throws Throws an error if no argument is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Inline function
 * assertEquals(isfunction(function() { return console.log("Hello"); }), true, 'Inline function should return true');
 *
 * // Example 2: Built-in function
 * assertEquals(isfunction(Math.log), true, 'Built-in function should return true');
 *
 * // Example 3: Not a function (number)
 * assertEquals(isfunction(42), false, 'Number should return false');
 *
 * // Example 4: Not a function (string)
 * assertEquals(isfunction("hello"), false, 'String should return false');

 * ```*/
export default function isfunction(x: unknown): boolean {
  return typeof x === "function";
}

/**
 * @function isscalar
 * @summary Checks if the input is a scalar value.
 * @description Returns `true` if the input is a scalar, meaning it is either a single number, an array with one element, or a matrix with one element.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a scalar, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single number
 * assertEquals(isscalar(2), true);
 *
 * // Example 2: Array with one element
 * assertEquals(isscalar([2]), true);
 *
 * // Example 3: Matrix with one element
 * assertEquals(isscalar([[2]]), true);
 *
 * // Example 4: Array with multiple elements
 * assertEquals(isscalar([1, 2, 3]), false);
 *
 * // Example 5: Matrix with multiple elements
 * assertEquals(isscalar([[1, 2], [3, 4]]), false);
 *
 * // Example 6: Empty array (not a scalar)
 * assertEquals(isscalar([]), false);
 *
 * // Example 7: Empty matrix (not a scalar)
 * assertEquals(isscalar([[]]), false);

 * ```*/
export default function isscalar(x: unknown): boolean {
  if (typeof x === "number") {
    return true;
  }

  if (Array.isArray(x)) {
    if (x.length === 0) {
      return false;
    }

    if (x.length === 1 && !Array.isArray(x[0])) {
      return true;
    }

    if (x.length === 1 && Array.isArray(x[0]) && x[0].length === 1) {
      return true;
    }
  }

  return false;
}

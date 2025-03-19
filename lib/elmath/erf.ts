/** @import { array, matrix } from '../types.d.ts' */

import erfc from "./erfc.ts";

/**
 * @function erf
 * @summary Error function
 * @description Calculates the error function, which is commonly used in probability, statistics, and partial differential equations describing diffusion.
 *
 * The error function is defined as:
 *
 * \[
 * \text{erf}(x) = \frac{2}{\sqrt{\pi}} \int_0^x e^{-t^2} dt
 * \]
 *
 * This implementation approximates the error function with a maximal error of \(1.2 \times 10^{-7}\).
 *
 * @param {number} x A real value.
 * @returns {number} The value of the error function for the input x.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the error function for a single value
 * assertEquals(erf(0.5), 0.5204999077232426);
 *
 * // Example 2: Compute the error function for a negative value
 * assertEquals(erf(-1), -0.8427007929497149);
 *
 * // Example 3: Compute the error function for zero
 * assertEquals(erf(0), 0);
 *
 * // Example 4: Compute the error function for a large positive value
 * assertEquals(erf(2), 0.9953222650189527);
 *
 * // Example 5: Compute the error function for a large negative value
 * assertEquals(erf(-2), -0.9953222650189527);

 * ```*/
export default function erf(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }
  return 1 - erfc(x);
}

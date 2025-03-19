/** @import { array, matrix } from '../types.d.ts' */

/**
 * @function erfc
 * @summary Complementary error function
 * @description Calculates the complementary error function, which is widely used in probability, statistics, and partial differential equations.
 *
 * The complementary error function is defined as:
 *
 * \[
 * \text{erfc}(x) = \frac{2}{\sqrt{\pi}} \int_x^{\infty} e^{-t^2} dt = 1 - \text{erf}(x)
 * \]
 *
 * This implementation provides an approximation with a high degree of accuracy.
 *
 * @param {number} x A real value.
 * @returns {number} The value of the complementary error function for the input x.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the complementary error function for a single value
 * assertEquals(erfc(0.5), 0.47950009227675744);
 *
 * // Example 2: Compute the complementary error function for a negative value
 * assertEquals(erfc(-1), 1.8427007929497148);
 *
 * // Example 3: Compute the complementary error function for zero
 * assertEquals(erfc(0), 1);
 *
 * // Example 4: Compute the complementary error function for a large positive value
 * assertEquals(erfc(2), 0.004677734981047265);
 *
 * // Example 5: Compute the complementary error function for a large negative value
 * assertEquals(erfc(-2), 1.9953222650189527);

 * ```*/
export default function erfc(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (x === 0) return 1;

  const z = Math.abs(x);
  const t = 1 / (0.5 * z + 1);
  const a1 = t * 0.17087277 + -0.82215223;
  const a2 = t * a1 + 1.48851587;
  const a3 = t * a2 + -1.13520398;
  const a4 = t * a3 + 0.27886807;
  const a5 = t * a4 + -0.18628806;
  const a6 = t * a5 + 0.09678418;
  const a7 = t * a6 + 0.37409196;
  const a8 = t * a7 + 1.00002368;
  const a9 = t * a8;
  const a10 = -z * z - 1.26551223 + a9;
  let a = t * Math.exp(a10);

  if (x < 0) {
    a = 2 - a;
  }
  return a;
}

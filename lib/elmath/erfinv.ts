/** @import { array, matrix } from '../types.d.ts' */
import erf from "./erf.ts";

/**
 * @function erfinv
 * @summary Inverse error function
 * @description Computes the inverse of the error function.
 *
 * The inverse error function satisfies \( y = \text{erf}(x) \), for \( -1 \leq y \leq 1 \) and \( -\infty \leq x \leq \infty \).
 *
 * @param {number} y A real value in the range [-1, 1].
 * @returns {number} The value of the inverse error function.
 * @throws {Error} If no arguments are provided or if the input is out of range.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the inverse error function for a positive value
 * assertEquals(erfinv(0.1), 0.08885596505119545);
 *
 * // Example 2: Compute the inverse error function for a negative value
 * assertEquals(erfinv(-0.5), -0.476936236121904);
 *
 * // Example 3: Compute the inverse error function for 0 (should return 0)
 * assertEquals(erfinv(0), 0);
 *
 * // Example 4: Compute the inverse error function for 1 (should return positive infinity)
 * assertEquals(erfinv(1), Infinity);
 *
 * // Example 5: Compute the inverse error function for -1 (should return negative infinity)
 * assertEquals(erfinv(-1), -Infinity);

 * ```*/
export default function erfinv(y: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (y <= -1) return -Infinity;
  if (y >= 1) return Infinity;

  let z, x;

  if (y < -0.7) {
    z = Math.sqrt(-Math.log((1 + y) / 2));
    x = -calculateX(z);
  } else if (y < 0.7) {
    z = y * y;
    x = calculateCentral(z, y);
  } else {
    z = Math.sqrt(-Math.log((1 - y) / 2));
    x = calculateX(z);
  }

  // Refine the result using Newton-Raphson method
  x = refineResult(x, y);
  return x;
}

/**
 * @function calculateX
 * @description Helper function to calculate the initial approximation for the inverse error function.
 * @param {number} z Intermediate value based on the input.
 * @returns {number} Initial approximation.
 */
function calculateX(z: any) {
  const c1 = 1.641345311,
    c2 = 3.429567803,
    c3 = -1.624906493,
    c4 = -1.970840454;
  const c5 = 1.637067800, c6 = 3.543889200;
  const numerator = ((c1 * z + c2) * z + c3) * z + c4;
  const denominator = (c5 * z + c6) * z + 1;
  return numerator / denominator;
}

/**
 * @function calculateCentral
 * @description Helper function to calculate the initial approximation for values close to 0.
 * @param {number} z Square of the input value.
 * @param {number} y Input value.
 * @returns {number} Initial approximation.
 */
function calculateCentral(z: any, y: any) {
  const c1 = -0.140543331,
    c2 = 0.914624893,
    c3 = -1.645349621,
    c4 = 0.886226899;
  const c5 = 0.012229801,
    c6 = -0.329097515,
    c7 = 1.442710462,
    c8 = -2.118377725;
  const numerator = ((c1 * z + c2) * z + c3) * z + c4;
  const denominator = (((c5 * z + c6) * z + c7) * z + c8) * z + 1;
  return y * numerator / denominator;
}

/**
 * @function refineResult
 * @description Refines the initial approximation using the Newton-Raphson method.
 * @param {number} x Initial approximation.
 * @param {number} y Input value.
 * @returns {number} Refined approximation.
 */
function refineResult(x: any, y: any) {
  const sqrtPiInv = 2 / Math.sqrt(Math.PI);
  for (let i = 0; i < 2; i++) {
    const error = erf(x) - y;
    x -= error / (sqrtPiInv * Math.exp(-x * x) - x * error);
  }
  return x;
}

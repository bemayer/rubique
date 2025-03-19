/** @import { array, matrix } from '../types.d.ts' */

import varc from "./varc.ts";
import sqrt from "../elmath/sqrt.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function std
 * @summary Computes the Standard Deviation
 * @description Computes the standard deviation for an array or matrix.
 * Supports both **population (N)** and **sample (N-1)** normalizations.
 *
 * **Formula:**
 * - Population (flag = 0):
 *   **σ = sqrt(Σ (xᵢ - μ)² / N)**
 * - Sample (flag = 1, default):
 *   **s = sqrt(Σ (xᵢ - x̄)² / (N - 1))**
 *
 * @param {array|matrix} x Input array or matrix.
 * @param {number} [flag=1] Normalization type:
 *   - `0`: Population standard deviation
 *   - `1`: Sample standard deviation (default)
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed standard deviation.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * import std from './std.ts';
 *
 * // Example 1: Standard deviation of a 1D array (sample)
 * const c = [5, 6, 3];
 * assertEquals(std(c), 1.52753);
 *
 * // Example 2: Standard deviation of a 1D array (population)
 * assertEquals(std(c, 0), 1.24722);
 *
 * // Example 3: Standard deviation of a 2D matrix (row-wise, population)
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(std(a, 0), [[0.471405], [4.027682]]);
 *
 * // Example 4: Standard deviation of a 2D matrix (column-wise, population)
 * assert.deepStrictEqual(std(a, 0, 1), [[1, 1, 3]]);
 *
 * // Example 5: Throws an error for invalid input
 * assert.throws(() => std(123), /Input must be an array or matrix/);

 * ```*/
export default function std(x: any, flag = 1, dim = 0) {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return sqrt(varc(x, flag, dim));
}

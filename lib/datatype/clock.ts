import type { array } from "../types.d.ts";

/**
 * @function clock
 * @summary Retrieves the current date and time as a date vector.
 * @description Returns the current date and time as an array with the following elements:
 * [year, month, day, hour, minute, seconds, milliseconds]. Note that the month is adjusted to be 1-based (January is 1, December is 12).
 *
 * @returns  An array representing the current date and time: [year, month, day, hour, minute, seconds, milliseconds].
 *
 * @example
 * ```ts
 * import { assert } from "jsr:@std/assert";
 *
 * // Example: Get the current date and time as a array
 * const currentTime = clock();
 *
 * // The result should be an array
 * assert(Array.isArray(currentTime));
 *
 * // The array should have 7 elements
 * assert(currentTime.length === 7);

 * ```
 */
export default function clock(): array {
  const now = new Date();
  return [
    now.getFullYear(), // Year
    now.getMonth() + 1, // Month (0-based, so add 1)
    now.getDate(), // Day of the month
    now.getHours(), // Hour
    now.getMinutes(), // Minute
    now.getSeconds(), // Second
    now.getMilliseconds(), // Millisecond
  ];
}

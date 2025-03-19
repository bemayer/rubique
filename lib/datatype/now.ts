import dayjs from "dayjs";

/**
 * @function now
 * @summary Current date and time as a Unix timestamp.
 * @description Returns the current date and time as a Unix timestamp (seconds since the Unix epoch).
 *
 * @returns The current Unix timestamp.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example: Get the current Unix timestamp
 * const currentTimestamp = now();
 * assertEquals(typeof currentTimestamp, 'number');
 * // Current timestamp should be positive
 * assertEquals(currentTimestamp > 0, true);
 * ``` */
export default function now() {
  return dayjs().unix();
}

import dayjs from "dayjs";

/**
 * @function today
 * @summary Gets the current date as a Unix timestamp.
 * @description Returns the Unix timestamp for the start of the current day (00:00:00).
 *
 * @returns {number} The Unix timestamp for the current date.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import dayjs from "dayjs";
 *
 * // Example 1: Get the Unix timestamp for today's date
 * const todayTimestamp = today();
 * assertEquals(typeof todayTimestamp, 'number');
 * // Should match the start of today
 * assertEquals(todayTimestamp, dayjs().startOf('day').unix());
 * ``` */
export default function today() {
  return dayjs().startOf("day").unix();
}

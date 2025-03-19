import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
import isoWeek from "https://esm.sh/dayjs/plugin/isoWeek";
import arrayfun from "./arrayfun.ts";
import { array, matrix } from "../types.d.ts";
import isarray from "./isarray.ts";
import ismatrix from "./ismatrix.ts";

dayjs.extend(utc);
dayjs.extend(isoWeek);

/**
 * @function weekday
 * @summary Gets the ISO weekday for a given Unix timestamp.
 * @description Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param {number|array<number>|matrix<number>} x - Unix timestamp(s) to convert to the ISO weekday.
 * @returns {number|array<number>|matrix<number>} - The corresponding ISO weekday(s).
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single Unix timestamp
 * assertEquals(weekday(1426636800), 3); // (Wednesday)
 *
 * // Example 2: Array of Unix timestamps
 * assertEquals(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * // Example 3: Matrix of Unix timestamps
 * assertEquals(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 * ```
 */

export default function weekday(x: number): number;
export default function weekday(x: array): array;
export default function weekday(x: matrix): matrix;
export default function weekday(
  x: number | array | matrix,
): number | array | matrix {
  const getWeekday = (timestamp: number): number =>
    dayjs.unix(timestamp).utc().isoWeekday();

  return arrayfun(x, getWeekday);
}

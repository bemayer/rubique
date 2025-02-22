import { array, matrix } from "../types.d.ts";
import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
import arraySupport from "https://esm.sh/dayjs/plugin/arraySupport";
import ismatrix from "./ismatrix.ts";

dayjs.extend(utc);
dayjs.extend(arraySupport);

/**
 * @function datenum
 * @summary Convert date and time to a serial date number (Unix)
 * @description Converts a given date and time to a Unix timestamp (serial date number). The function supports both date strings with a format and numeric arrays representing components of date and time.
 *
 * @param {} d The date input, which can be a single value or an array of date components.
 * @param {string} [fmt] The format string to parse the date if the input is a date string.
 * @returns {number | array} The Unix timestamp or an array of Unix timestamps.
 *
 * @example
 * // Example 1: Convert a date string to a Unix timestamp
 * assert.strictEqual(datenum('31-12-2014', 'DD-MM-YYYY'), 1419984000);
 *
 * // Example 2: Convert an array of date strings to an array of Unix timestamps
 * assert.deepStrictEqual(datenum(['31-12-2014', '31-01-2015'], 'DD-MM-YYYY'), [1419984000, 1422662400]);
 *
 * // Example 3: Convert an array of date components to a Unix timestamp
 * assert.strictEqual(datenum([2015, 4, 5, 12, 20, 30, 0]), 1428236430);
 *
 * // Example 4: Convert an array of arrays of date components to an array of Unix timestamps
 * assert.deepStrictEqual(datenum([[2013, 1, 31, 0, 0, 0, 0], [2014, 2, 28, 0, 0, 0, 0], [2015, 4, 30, 0, 0, 0, 0]]), [1359590400, 1393545600, 1430352000]);
 */
export default function datenum(
  d: string | array<string | number> | matrix,
  fmt: string,
): number | array {
  if (!d) {
    throw new Error("Not enough input arguments");
  }

  if (Array.isArray(d) && d.every((el) => typeof el === "string")) {
    return d.map((item) => parseDateToUnix(item, fmt) as number);
  }

  return parseDateToUnix(d, fmt);
}

function parseDateToUnix(
  input: string | array<string | number> | matrix,
  format: any,
): number | array {
  if (typeof input === "string") {
    if (!format) {
      throw new Error("Insert format for date string");
    }
    return dayjs.utc(input, format).unix();
  } else if (
    Array.isArray(input) && input.every((el) => typeof el === "number")
  ) {
    const [
      year,
      month = 1,
      day = 1,
      hour = 0,
      minute = 0,
      second = 0,
      millisecond = 0,
    ] = input;
    return dayjs.utc([year, month - 1, day, hour, minute, second, millisecond])
      .unix();
  } else if (ismatrix(input)) {
    return input.map((comp: array) => parseDateToUnix(comp, format) as number);
  }
  throw new Error("Invalid input type");
}

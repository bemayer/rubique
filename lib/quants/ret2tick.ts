// deno-lint-ignore-file no-explicit-any
import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * @function ret2tick
 * @summary Convert a return series to a value series with a start value
 * @description Converts a return series to a value series (prices) given a starting value.
 * Can handle both simple and continuous (log) returns.
 *
 * @param x array of returns
 * @param mode method to compute values: 'simple','continuous' (def: simple)
 * @param sval start value (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Value series
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { ret2tick } from "../../index.ts";
 *
 * // Example 1: Converting returns to prices with a custom start value
 * assertEquals(ret2tick([0.5,-3,2.3],'simple',100), [100, 150, -300, -990]);
 *
 * // Example 2: Converting matrix of returns to prices
 * assertEquals(ret2tick([[9, 5], [6, 1]],'simple',100), [[100, 1000, 6000], [100, 700, 1400]]);
 * ```
 */
export default function ret2tick(
  x: any,
  mode: string = "simple",
  sval: number = 1,
  dim: number = 0,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const _ret2tick = function (a: any, mode: string, sval: number) {
    if (isnumber(a)) {
      a = [a];
    }

    const r = [];
    r[0] = sval;

    if (mode === "simple") {
      for (let i = 1; i <= a.length; i++) {
        r[i] = r[i - 1] * (1 + a[i - 1]);
      }
    } else if (mode === "continuous") {
      for (let i = 1; i <= a.length; i++) {
        r[i] = r[i - 1] * Math.exp(a[i - 1]);
      }
    } else {
      throw new Error("unknown return method");
    }

    return r;
  };

  return vectorfun(dim, x, _ret2tick, mode, sval);
}

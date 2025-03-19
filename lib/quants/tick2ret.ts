import type { array, matrix } from "../types.d.ts";
import {
  isarray,
  isnumber,
  isundefined,
  log,
  size,
  zeros,
} from "../../index.ts";

/**
 * @function tick2ret
 * @summary Convert price series to returns
 * @description Convert a price series to continuous or discrete returns
 *
 * @param x array of values (prices)
 * @param mode calculation mode: 'simple' (default) or 'continuous'
 * @param dim dimension 0: row, 1: column (def: 1)
 * @return Returns
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { tick2ret, cat } from "../../index.ts";
 *
 * // Example 1: Simple returns from price series
 * var x = [1,3,2,5];
 * assertEquals(tick2ret(x), [2,-.333333,1.5]);
 *
 * // Example 2: Continuous (log) returns
 * assertEquals(tick2ret(x,"continuous"), [1.098612,-0.405465,0.916291]);
 *
 * // Example 3: Returns for multiple price series with row dimension
 * var y = [0.5,1.5,2.5,3.5];
 * assertEquals(tick2ret(cat(1,x,y),"continuous",0), [[1.098612,-0.405465,0.916291],[1.098612,0.510826,0.336472]]);
 * ```
 */
export default function tick2ret(
  x: any,
  mode: string = "simple",
  dim: any = 1,
): any {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  // Return values from prices
  const _ret = function (a: any, mode: string) {
    const n = a.length;
    const r = new Array(n - 1);

    if (mode === "simple") {
      for (let i = 0; i < n - 1; i++) {
        r[i] = (a[i + 1] / a[i]) - 1;
      }
    } else if (mode === "continuous") {
      for (let i = 0; i < n - 1; i++) {
        r[i] = log(a[i + 1] / a[i]);
      }
    }
    return r;
  };

  // Row vector of prices
  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  if (isarray(x)) {
    if (dim === 0) {
      const n = size(x)[0] - 1;
      const r = zeros(n, size(x)[1]);
      for (let i = 0; i < size(x)[1]; i++) {
        const tmp = [];
        for (let j = 0; j < size(x)[0]; j++) {
          tmp.push(x[j][i]);
        }

        const rt = _ret(tmp, mode);
        for (let j = 0; j < rt.length; j++) {
          r[j][i] = rt[j];
        }
      }
      return r;
    } else if (dim === 1) {
      return _ret(x, mode);
    }
  }

  if (dim === 0) {
    const n = size(x)[0] - 1;
    const r = zeros(n, size(x)[1]);
    for (let i = 0; i < size(x)[1]; i++) {
      const tmp = [];
      for (let j = 0; j < size(x)[0]; j++) {
        tmp.push(x[j][i]);
      }

      const rt = _ret(tmp, mode);
      for (let j = 0; j < rt.length; j++) {
        r[j][i] = rt[j];
      }
    }
    return r;
  } else if (dim === 1) {
    const n = size(x)[1] - 1;
    const r = zeros(size(x)[0], n);
    for (let i = 0; i < size(x)[0]; i++) {
      const tmp = [];
      for (let j = 0; j < size(x)[1]; j++) {
        tmp.push(x[i][j]);
      }

      const rt = _ret(tmp, mode);
      for (let j = 0; j < rt.length; j++) {
        r[i][j] = rt[j];
      }
    }
    return r;
  }
}

import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  colon,
  isnumber,
  max,
  min,
  plus,
  times,
  vectorfun,
} from "../../index.ts";

/**
 * @function histc
 * @summary Histogram count
 * @description Counts the number of values in x that fall between the elements in the bins array.
 * Values outside the range in bins are not counted.
 *
 * @param x The input array or matrix
 * @param bins Optional number of bins (number) or array of edges (array). Default is 10
 * @param dim Optional dimension along which to compute the histogram. Default is 0 (rows)
 * @returns An array of objects containing bin information:
 *          - bins: the bin edge value
 *          - count: number of values in this bin
 *          - freq: frequency (proportion of values in this bin)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { histc, cat } from "../../index.ts";
 *
 * // Example 1: Histogram with custom bin edges
 * const A = [87, 27, 45, 62, 3, 52, 20, 43, 74, 61];
 * assertEquals(
 *   histc(A, [0, 20, 40, 60, 80, 100]),
 *   [
 *     { bins: 0, count: 1, freq: 0.1 },
 *     { bins: 20, count: 2, freq: 0.2 },
 *     { bins: 40, count: 3, freq: 0.3 },
 *     { bins: 60, count: 3, freq: 0.3 },
 *     { bins: 80, count: 1, freq: 0.1 },
 *     { bins: 100, count: 0, freq: 0 }
 *   ]
 * );
 *
 * // Example 2: Histogram for each row of a matrix
 * const B = [12, 34, 57, 43, 88, 75, 89, 2, 27, 29];
 * assertEquals(
 *   histc(cat(0, A, B), [0, 50, 100]),
 *   [
 *     [
 *       { bins: 0, count: 5, freq: 0.5 },
 *       { bins: 50, count: 5, freq: 0.5 },
 *       { bins: 100, count: 0, freq: 0 }
 *     ],
 *     [
 *       { bins: 0, count: 6, freq: 0.6 },
 *       { bins: 50, count: 4, freq: 0.4 },
 *       { bins: 100, count: 0, freq: 0 }
 *     ]
 *   ]
 * );
 * ```
 */
export default function histc(
  x: numarraymatrix,
  bins: number | array = 10,
  dim: number = 0,
): array | matrix {
  interface HistBin {
    bins: number;
    count: number;
    freq: number;
  }

  const _histc = function (a: number[], bins: number | array): HistBin[] {
    let y: number[] = [];
    const h: number[] = [];
    const out: HistBin[] = [];

    if (typeof bins === "number") {
      const xmin = min(a) as number;
      const xmax = max(a) as number;
      const binw = (xmax - xmin) / bins;
      const anum = colon(0, bins) as number[];
      y = plus(times(anum, binw), xmin) as number[];
    } else {
      y = bins;
    }

    for (let k = 0; k < y.length; k++) {
      h[k] = 0;
      for (let i = 0; i < a.length; i++) {
        if (y[k] <= a[i] && (y[k + 1] === undefined || a[i] < y[k + 1])) {
          h[k] += 1;
        } else if (a[i] === y[k]) {
          h[k] += 1;
        }
      }
      out.push({ bins: y[k], count: h[k], freq: h[k] / a.length });
    }

    return out;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _histc, bins);
}

import colon from "./colon.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function mergesort
 * @summary Sort array in ascending or descending order
 * @description Mergesort is a divide-and-conquer algorithm that recursively splits an array into halves,
 * sorts each half, and then merges them back together in the desired order.
 * It returns the sorted values along with their original indexes.
 *
 * @param {array<number>} x Array of elements to sort.
 * @param {string} [mode='ascend'] Sorting direction: `"ascend"` (default) or `"descend"`.
 * @returns {array<array<number>>} A 2D array: the first row contains sorted values, the second row contains the original indexes.
 * @throws {Error} If no arguments are provided or the mode is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sort an array in ascending order with indexes
 * assert.deepStrictEqual(mergesort([9, -3, 2, -12, 0, 1]), [
 *   [-12, -3, 0, 1, 2, 9],
 *   [3, 1, 4, 5, 2, 0],
 * ]);
 *
 * // Example 2: Sort an array in descending order with indexes
 * assert.deepStrictEqual(mergesort([9, -3, 2, -12, 0, 1], 'descend'), [
 *   [9, 2, 1, 0, -3, -12],
 *   [0, 2, 5, 4, 1, 3],
 * ]);
 *
 * // Example 3: Sort an array of length 1
 * assert.deepStrictEqual(mergesort([5]), [[5], [0]]);
 *
 * // Example 4: Invalid mode
 * assert.throws(() => mergesort([1, 2, 3], 'invalid'), /sorting must be "ascend" or "descend"/);
 *
 * // Example 5: Empty array
 * assert.deepStrictEqual(mergesort([]), [[], []]);
 *
 * // Example 6: Array with repeated values
 * assert.deepStrictEqual(mergesort([3, 1, 3, 2, 3]), [
 *   [1, 2, 3, 3, 3],
 *   [1, 3, 0, 2, 4],
 * ]);

 * ```*/
// @ts-expect-error TS(7023): 'mergesort' implicitly has return type 'any' becau... Remove this comment to see the full error message
export default function mergesort(x: any, mode = "ascend") {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isarray(x)) {
    x = [x, colon(0, x.length - 1)];
  }

  const len = x[0].length;
  if (len < 2) {
    return x;
  }

  const cx = Math.floor(len / 2);
  const sx = x[0].slice(0, cx);
  const sxi = x[1].slice(0, cx);
  const dx = x[0].slice(cx);
  const dxi = x[1].slice(cx);
  const _sx = [sx, sxi];
  const _dx = [dx, dxi];

  const merge = (sxarr: any, dxarr: any, mode: any) => {
    const sorted = [];
    const idx = [];
    while (sxarr[0].length && dxarr[0].length) {
      let compare;
      if (mode === "ascend") {
        compare = sxarr[0][0] <= dxarr[0][0];
      } else if (mode === "descend") {
        compare = sxarr[0][0] >= dxarr[0][0];
      } else {
        throw new Error('sorting must be "ascend" or "descend"');
      }
      if (compare) {
        sorted.push(sxarr[0].shift());
        idx.push(sxarr[1].shift());
      } else {
        sorted.push(dxarr[0].shift());
        idx.push(dxarr[1].shift());
      }
    }

    while (sxarr[0].length) {
      sorted.push(sxarr[0].shift());
      idx.push(sxarr[1].shift());
    }

    while (dxarr[0].length) {
      sorted.push(dxarr[0].shift());
      idx.push(dxarr[1].shift());
    }

    return [sorted, idx];
  };

  return merge(mergesort(_sx, mode), mergesort(_dx, mode), mode);
}

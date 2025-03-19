import { array, matrix } from "../types.d.ts";
import isarray from "./isarray.ts";
import isempty from "./isempty.ts";
import ncols from "../matarrs/ncols.ts";
import nrows from "../matarrs/nrows.ts";
import getcol from "../matarrs/getcol.ts";
import getrow from "../matarrs/getrow.ts";
import transpose from "../matarrs/transpose.ts";

/**
 * @function vectorfun
 * @summary Applies a function to each vector column or row of a matrix.
 * @description This function applies a given function to each vector (column or row) of a matrix based on the specified dimension.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Apply function along rows of a matrix
 * const testfun = (a: number[], b: number, c: number): number => a.reduce((sum: number, num: number) => sum + num, 0) / a.length * b + c;
 * assertEquals(vectorfun(0, [[5, 6, 5], [7, 8, -1]], testfun, 5, 10), [ 36.666666666666664, 33.333333333333336 ]);
 *
 * // Example 2: Apply function along columns of a matrix
 * assertEquals(vectorfun(1, [[5, 6, 5], [7, 8, -1]], testfun, 5, 10), [ [ 40 ], [ 45 ], [ 20 ] ]);
 * ```
 */

export default function vectorfun<T, U, Args extends unknown[]>(
  dim: 0 | 1,
  x: array<T>,
  fun: (vector: array<T>, ...args: Args) => U,
  ...varargin: Args
): [U];
export default function vectorfun<T, U, Args extends unknown[]>(
  dim: 0,
  x: matrix<T>,
  fun: (vector: array<T>, ...args: Args) => U,
  ...varargin: Args
): array<U>;
export default function vectorfun<T, U, Args extends unknown[]>(
  dim: 1,
  x: matrix<T>,
  fun: (vector: array<T>, ...args: Args) => U,
  ...varargin: Args
): matrix<U>;
export default function vectorfun<T, U, Args extends unknown[]>(
  dim: 0 | 1,
  x: array<T> | matrix<T>,
  fun: (vector: array<T>, ...args: Args) => U,
  ...varargin: Args
): [U] | array<U> | matrix<U> {
  if (isarray(x)) {
    return [applyFunction(fun, x as array<T>, varargin)];
  }

  const { ndim, narray } = getMatrixParams(dim, x as matrix<T>);

  const v = processMatrix(ndim, narray, x as matrix<T>, fun, varargin);

  return formatResult(dim, v);
}

/**
 * Applies a function to an array with variable arguments
 */
function applyFunction<T, U, Args extends unknown[]>(
  fun: (vector: array<T>, ...args: Args) => U,
  x: array<T>,
  varargin: Args,
): U {
  return isempty(varargin)
    ? fun(x, ...([] as unknown as Args))
    : fun(x, ...varargin);
}

/**
 * Gets the appropriate matrix parameters based on dimension
 */
function getMatrixParams<T>(dim: 0 | 1, x: matrix<T>): {
  ndim: number;
  narray: (x: matrix<T>, idx: number) => array<T>;
} {
  if (dim === 1) {
    return { ndim: ncols(x), narray: getcol };
  } else {
    return { ndim: nrows(x), narray: getrow };
  }
}

/**
 * Processes a matrix by applying a function to each vector
 */
function processMatrix<T, U, Args extends unknown[]>(
  ndim: number,
  narray: (x: matrix<T>, idx: number) => array<T>,
  x: matrix<T>,
  fun: (vector: array<T>, ...args: Args) => U,
  varargin: Args,
): array<U> {
  const v: U[] = [];
  for (let i = 0; i < ndim; i++) {
    const d = narray(x, i);
    const temp = fun(d, ...varargin);
    v.push(temp);
  }
  return v;
}

/**
 * Formats the result based on the dimension
 */
function formatResult<U>(dim: 0 | 1, v: array<U>): [U] | array<U> | matrix<U> {
  if (dim === 1) {
    return isarray(v[0]) ? [v] : transpose([v]) as matrix<U>;
  }
  if (dim === 0) {
    return isarray(v[0]) ? transpose([v]) as matrix<U> : v;
  }
  return v;
}

import { array, matrix } from '../types';

/**
 * @function lt
 * @summary Checks if values in one array are less than the corresponding values in another array.
 * @description Compares two inputs, which can be numbers, arrays, or matrices, and returns `true` where elements in the left input are less than the corresponding elements in the right input.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the comparison.
 *
 * @example
 * // Example 1: Comparison between two numbers
 * assert.strictEqual(lt(5, 5), false);
 *
 * // Example 2: Comparison between a number and an array
 * assert.deepStrictEqual(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * // Example 3: Comparison between a number and a matrix
 * assert.deepStrictEqual(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * // Example 4: Comparison between an array and a number
 * assert.deepStrictEqual(lt([5, 6, 3], 5), [false, false, true]);
 *
 * // Example 5: Comparison between a matrix and a number
 * assert.deepStrictEqual(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * // Example 6: Comparison between two arrays
 * assert.deepStrictEqual(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * // Example 7: Comparison between two matrices
 * assert.deepStrictEqual(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 */
export function lt(x: number | array | matrix, y: number | array | matrix): boolean | array<boolean> | matrix<boolean>;

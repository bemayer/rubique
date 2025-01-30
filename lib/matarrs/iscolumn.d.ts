/**
 * @function iscolumn
 * @summary Checks if the input is a column vector.
 * @description Returns `true` if the input matrix is a column vector, meaning it has more than one row and exactly one column.
 *
 * @param x The input matrix to check.
 * @returns Returns `true` if `x` is a column vector, otherwise `false`.
 * @throws {Error} If the input is not a valid matrix or if no argument is provided.
 *
 * @example
 * // Example 1: Valid column vector
 * assert.strictEqual(iscolumn([[2], [2]]), true);
 *
 * // Example 2: Row vector (not a column vector)
 * assert.strictEqual(iscolumn([[2, 2]]), false);
 *
 * // Example 3: Column vector with multiple rows
 * assert.strictEqual(iscolumn([[1], [2], [3]]), true);
 *
 * // Example 4: Square matrix (not a column vector)
 * assert.strictEqual(iscolumn([[1, 2], [3, 4]]), false);
 *
 * // Example 5: Single-element column vector
 * assert.strictEqual(iscolumn([[1]]), true);
 *
 * // Example 6: Invalid input (not a matrix)
 * assert.throws(() => iscolumn(5), /Input must be a non-empty matrix/);
 *
 * // Example 7: Empty matrix (should throw an error)
 * assert.throws(() => iscolumn([]), /Input must be a non-empty matrix/);
 */
export function iscolumn(x: any): boolean;

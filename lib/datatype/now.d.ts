/**
 * @function now
 * @summary Current date and time as a Unix timestamp.
 * @description Returns the current date and time as a Unix timestamp (seconds since the Unix epoch).
 *
 * @returns The current Unix timestamp.
 *
 * @example
 * // Example: Get the current Unix timestamp
 * const currentTimestamp = now();
 * assert.strictEqual(typeof currentTimestamp, 'number');
 * assert.ok(currentTimestamp > 0);
 */
export function now(): number;

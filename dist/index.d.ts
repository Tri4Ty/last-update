/**
 * Retrieves the date of the last Git commit in the current repository.
 * @returns {Date} The date of the last commit.
 * @throws {Error} If the command fails or the repository is not a Git repository.
 */
export declare function getLastUpdate(): Date;
/**
 * Retrieves the date of the last Git commit, formatted as a string.
 * @param {string} [format] - Optional format string (uses Date.toLocaleString() by default).
 * Note: Advanced formatting requires a date library like date-fns or moment.js.
 * This basic version uses built-in Date methods.
 * @returns {string} The formatted date string.
 */
export declare function getLastUpdateFormatted(format?: string): string;

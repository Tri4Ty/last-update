import { execSync } from 'child_process';

/**
 * Retrieves the date of the last Git commit in the current repository.
 * @returns {Date} The date of the last commit.
 * @throws {Error} If the command fails or the repository is not a Git repository.
 */
export function getLastUpdate(): Date {
  try {
    // Execute git log command to get the date of the last commit
    const command = 'git log -1 --format=%cd';
    const output = execSync(command, { encoding: 'utf-8' });

    // Trim whitespace and parse the date string
    const dateString = output.trim();
    if (!dateString) {
      throw new Error('Could not retrieve commit date.');
    }

    return new Date(dateString);
  } catch (error: any) {
    // Handle errors, e.g., not a git repository or git command not found
    console.error('Error getting last update:', error.message);
    throw new Error(`Failed to get last commit date: ${error.message}`);
  }
}

/**
 * Retrieves the date of the last Git commit, formatted as a string.
 * @param {string} [format] - Optional format string (uses Date.toLocaleString() by default).
 * Note: Advanced formatting requires a date library like date-fns or moment.js.
 * This basic version uses built-in Date methods.
 * @returns {string} The formatted date string.
 */
export function getLastUpdateFormatted(format?: string): string {
  const date = getLastUpdate();

  if (format) {
    // Basic placeholder replacement - for more complex formats, a library is needed.
    // This is a very simplified example.
    let formattedDate = format;
    formattedDate = formattedDate.replace('YYYY', date.getFullYear().toString());
    formattedDate = formattedDate.replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'));
    formattedDate = formattedDate.replace('DD', date.getDate().toString().padStart(2, '0'));
    // Add more replacements as needed (HH, mm, ss, etc.)
    return formattedDate;
  } else {
    return date.toLocaleString(); // Default locale string
  }
}

// Example usage (for testing purposes)
// try {
//   console.log('Last Update Date Object:', getLastUpdate());
//   console.log('Last Update Formatted (Default):', getLastUpdateFormatted());
//   console.log('Last Update Formatted (Custom):', getLastUpdateFormatted('YYYY-MM-DD'));
// } catch (e) {
//   console.error(e);
// }

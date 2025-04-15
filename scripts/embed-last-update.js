// scripts/embed-last-update.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Gets the last commit date using git command.
 * @returns {string} ISO string representation of the last commit date.
 */
function getLastCommitDate() {
  try {
    const command = 'git log -1 --format=%cI'; // Use ISO 8601 format
    const output = execSync(command, { encoding: 'utf-8' });
    const dateString = output.trim();
    if (!dateString) {
      throw new Error('Could not retrieve commit date.');
    }
    // Validate the date string before returning
    if (isNaN(new Date(dateString).getTime())) {
        throw new Error(`Invalid date string received from git: ${dateString}`);
    }
    return dateString;
  } catch (error) {
    console.error('Error getting last commit date:', error.message);
    // Fallback or re-throw depending on desired behavior
    // For a build script, maybe return a default date or throw to fail the build
    return new Date().toISOString(); // Fallback to current date as ISO string
  }
}

const lastUpdateDate = getLastCommitDate();

// Option 1: Write to a JSON file (e.g., for import in JS/TS)
const outputPathJson = path.resolve(process.cwd(), 'src', 'last-update-data.json');
const outputDirJson = path.dirname(outputPathJson);
if (!fs.existsSync(outputDirJson)) {
  fs.mkdirSync(outputDirJson, { recursive: true });
}
fs.writeFileSync(outputPathJson, JSON.stringify({ lastUpdate: lastUpdateDate }));
console.log(`Last update date written to ${outputPathJson}`);

// Option 2: Set an environment variable (useful for build tools like Webpack/Vite)
// This part is illustrative; actual setting depends on the build tool.
// Example: process.env.VITE_APP_LAST_UPDATE = lastUpdateDate;
// console.log(`Set environment variable (example): VITE_APP_LAST_UPDATE=${lastUpdateDate}`);

// Option 3: Generate a JS/TS module
const outputPathModule = path.resolve(process.cwd(), 'src', 'generated-last-update.ts');
const outputDirModule = path.dirname(outputPathModule);
if (!fs.existsSync(outputDirModule)) {
    fs.mkdirSync(outputDirModule, { recursive: true });
}
const moduleContent = `// Auto-generated file. Do not edit.\nexport const lastUpdate = '${lastUpdateDate}';\n`;
fs.writeFileSync(outputPathModule, moduleContent);
console.log(`Last update module generated at ${outputPathModule}`);

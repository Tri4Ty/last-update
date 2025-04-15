# Last Update Library

A simple NPM library to retrieve the date and time of the last Git commit in a repository.

## Installation

```bash
npm install last-update --save-dev
# or
yarn add last-update --dev
```

## Usage

### Node.js Environment

In Node.js environments (like build scripts, server-side code), you can directly import and use the functions:

```javascript
const { getLastUpdate, getLastUpdateFormatted } = require("last-update");
// Or using ES Modules: import { getLastUpdate, getLastUpdateFormatted } from 'last-update';

try {
  const lastCommitDate = getLastUpdate();
  console.log("Last Commit Date Object:", lastCommitDate);

  const formattedDateDefault = getLastUpdateFormatted();
  console.log("Formatted (Default Locale):", formattedDateDefault);

  // Note: Basic formatting only. For complex formats, use a date library.
  const formattedDateCustom = getLastUpdateFormatted("YYYY-MM-DD");
  console.log("Formatted (Custom):", formattedDateCustom);
} catch (error) {
  console.error("Failed to get last update:", error);
}
```

### Browser/Frontend Environment (Build-Time Embedding)

Since browsers cannot execute `git` commands, you need to embed the last commit date during your application's build process.

This library provides a helper script (`scripts/embed-last-update.js`) as an example, but you'll likely integrate this logic into your existing build tools (Webpack, Vite, Rollup, etc.).

**Example Integration:**

1.  **Add a build step:** Modify your `package.json` scripts or build tool configuration to run a script _before_ your main application build. This script will fetch the date and make it available.

    ```json
    // package.json (example)
    "scripts": {
      "embed-last-update": "node ./node_modules/last-update/scripts/embed-last-update.js",
      "build": "npm run embed-last-update && your-build-command"
      // e.g., "build": "npm run embed-last-update && vite build"
      // e.g., "build": "npm run embed-last-update && webpack"
    }
    ```

2.  **Consume the data:** The example `embed-last-update.js` script demonstrates writing the date to:

    - `src/last-update-data.json`: You can import this JSON file.
    - `src/generated-last-update.ts`: You can import this TypeScript module.
    - (Illustrative) Environment variables (e.g., `VITE_APP_LAST_UPDATE`): Access via `process.env` or `import.meta.env`.

    **Example (using generated module):**

    ```typescript
    // src/components/Footer.tsx (React Example)
    import React from "react";
    import { lastUpdate } from "../generated-last-update"; // Import the generated date

    function Footer() {
      const displayDate = new Date(lastUpdate).toLocaleDateString(); // Format as needed
      return <footer>Last updated: {displayDate}</footer>;
    }

    export default Footer;
    ```

Choose the method (JSON, generated module, environment variable) that best suits your project structure and build tools.

## API

- `getLastUpdate(): Date` - Returns the `Date` object of the last commit. Throws an error if `git` command fails.
- `getLastUpdateFormatted(format?: string): string` - Returns a formatted date string. Uses `toLocaleString()` by default. Provides very basic custom formatting (replace `YYYY`, `MM`, `DD`).

## License

ISC

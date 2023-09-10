#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { execSync } from "child_process";
// ... other imports

program.version("0.0.1");

program
  .command("toggle")
  .description("Toggle package between local and online versions")
  .action(() => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const packageJSONPath = path.join(process.cwd(), "package.json");

    if (!fs.existsSync(packageJSONPath)) {
      console.log("package.json not found");
      process.exit(1);
    }

    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));

    const packageName = "@wyxos/vision";
    const localPaths = [
      "file:../../../wyxos/js/vision",
      "file:../../js/vision"
    ];

    const isDevDependency = packageJSON.devDependencies && packageJSON.devDependencies[packageName];
    const isDependency = packageJSON.dependencies && packageJSON.dependencies[packageName];

    const dependencyKey = isDevDependency ? "devDependencies" : "dependencies";

    if (packageJSON[dependencyKey] && packageJSON[dependencyKey][packageName] && localPaths.includes(packageJSON[dependencyKey][packageName])) {
      packageJSON[dependencyKey][packageName] = "latest";
    } else {
      const existingPath = localPaths.find(p => fs.existsSync(path.join(__dirname, p.replace("file:", "")))) || localPaths[0];
      if (existingPath) {
        if (!packageJSON[dependencyKey]) {
          packageJSON[dependencyKey] = {};
        }
        packageJSON[dependencyKey][packageName] = existingPath;
      }
    }

    fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

// Run npm update
    try {
      execSync(`npm update ${packageName}`, { stdio: "inherit" });
      console.log(`Updated ${packageName}`);
    } catch (error) {
      console.error(`Failed to update ${packageName}:`, error);
    }

    console.log(`Toggled ${packageName}`);
  });

program
  .command("route:create")
  .description("Create a new Vue route")
  .action(() => {
    // Your logic for creating a Vue route
    // Ask questions using Commander or another package like Inquirer
    console.log("Created new Vue route");
  });

program.parse(process.argv);
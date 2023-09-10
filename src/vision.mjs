#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { execSync } from "child_process";
import inquirer from "inquirer";
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
  .action(async () => {
    const projectPath = process.cwd();
    const resourcesPath = path.join(projectPath, "resources");

    // Check for folders under /resources that contain /js
    const folders = fs.readdirSync(resourcesPath).filter(folder => {
      const jsPath = path.join(resourcesPath, folder, "js");
      return fs.existsSync(jsPath);
    });

    let defaultRoutePath = "/users/index";

    // Prompt user
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "app",
        message: "Which app to create a route for?",
        choices: folders
      },
      {
        type: "input",
        name: "routePath",
        message: "Enter the path of the route (e.g., /users/index):",
        default: defaultRoutePath
      },
      {
        type: "input",
        name: "componentLocation",
        message: "Enter the component location:",
        default: answers => answers.routePath
      },
      {
        type: "input",
        name: "componentName",
        message: "Enter the component name (e.g., UserIndex):",
        default: "WyxosComponent"
      },
      {
        type: "input",
        name: "routeName",
        message: "Enter the name of the route (e.g., users.index):",
        default: answers => answers.routePath.replace(/\//g, ".").replace(/^\./, "")
      }
    ]);

// Basic Vue component templates
    const indexTemplate = componentName => `
<template>
  <div>
    This is the index view for ${componentName}.
  </div>
</template>
<script>
import { Listing } from '@wyxos/vision'

export default {
  name: '${componentName}',
  setup(){
    const listing = Listing.create()
    
    return {
      listing
    }
  }
}
</script>
`;

    const createEditTemplate = componentName => `
<template>
  <div>
    This is the create/edit view for ${componentName}.
  </div>
</template>
<script>
import { FormBuilder } from '@wyxos/vision'

export default {
  name: '${componentName}'
  setup(){
    const form = FormBuilder.create()
    
    return {
      form
    }
  }
}
</script>
`;

    const defaultTemplate = componentName => `
<template>
  <div>
    ${componentName} works!
  </div>
</template>
<script>
export default {
  name: '${componentName}'
}
</script>
`;

    const fileName = path.basename(answers.componentLocation);

    let chosenTemplate;
    if (fileName === "index") {
      chosenTemplate = indexTemplate;
    } else if (["create", "edit"].includes(fileName)) {
      chosenTemplate = createEditTemplate;
    } else {
      chosenTemplate = defaultTemplate;
    }

    const componentPath = path.join(resourcesPath, answers.app, "js", "views", answers.componentLocation + ".vue");

// Create component directory if it doesn't exist
    const componentDir = path.dirname(componentPath);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

// Create component file
    fs.writeFileSync(componentPath, chosenTemplate(answers.componentName));

    console.log(`Created new component at ${componentPath}`);

    // Update routes.js
    const routesPath = path.join(resourcesPath, answers.app, "js", "routes.js");
    if (fs.existsSync(routesPath)) {
      const importLine = `import ${answers.componentName} from './views${answers.componentLocation}.vue';\n`;
      const routeEntry = `  { path: '${answers.routePath}', component: ${answers.componentName}, name: '${answers.routeName}' },\n`;

      let routesContent = fs.readFileSync(routesPath, "utf8");

      // Check if import line already exists
      if (!routesContent.includes(importLine)) {
        // Insert new import line after the last existing import
        const lastImportIndex = routesContent.lastIndexOf("import");
        const nextLineIndex = routesContent.indexOf("\n", lastImportIndex);
        routesContent = routesContent.slice(0, nextLineIndex + 1) + importLine + routesContent.slice(nextLineIndex + 1);
      }

      // Insert new route entry
      routesContent = routesContent.replace("export default [", "export default [\n" + routeEntry);

      fs.writeFileSync(routesPath, routesContent);

      console.log(`Added new route to ${routesPath}`);
    } else {
      console.log(`routes.js not found in ${routesPath}`);
    }
  });

program.parse(process.argv);
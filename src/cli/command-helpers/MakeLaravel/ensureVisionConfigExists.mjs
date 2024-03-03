import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import yaml from "js-yaml";
import {getVisionConfigPath} from "../../helpers/configPaths.mjs";
import {readJsonFile, writeJsonFile} from "../../helpers/jsonUtils.mjs";

export default async function ensureVisionConfigExists() {
    let config = {};

    // Check if the config file exists
    if (!fs.existsSync(getVisionConfigPath())) {
        const baseConfig = await inquirer.prompt([
            {
                type: 'input',
                name: 'homesteadDir',
                message: 'Enter the full path to your Homestead directory:',
                validate: input => !!input || 'Homestead directory path is required.',
                default: 'D:\\homestead'
            }
        ]);

        // Read and parse Homestead.yaml to get mappings
        const homesteadPath = path.join(baseConfig.homesteadDir, 'Homestead.yaml');
        const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
        const homesteadConfig = yaml.load(yamlContent);

        // Assuming mappings are in homesteadConfig.folders, adjust if needed
        const mappings = homesteadConfig.folders.map(folder => ({
            name: `${folder.map} -> ${folder.to}`,
            value: folder
        }));

        const projectConfig = await inquirer.prompt([
            {
                type: 'list',
                name: 'projectMapping',
                message: 'Select the mapping where the project should be created:',
                choices: mappings
            },
            {
                type: 'input',
                name: 'projectSubPath',
                message: 'Enter the subpath within the selected mapping for the project:',
                default: 'wyxos/php' // Adjust the default as necessary
            }
        ]);

        config = {...baseConfig, ...projectConfig};

        // Save the config for future use
        await writeJsonFile(getVisionConfigPath(), config);
    } else {
        // Read and return the existing config
        config = readJsonFile(getVisionConfigPath());

        // Prompt for projectSubPath regardless of whether the config exists
        const projectSubPathAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectSubPath',
                message: 'Enter the sub path within the selected mapping for the project:',
                default: config.projectSubPath || 'wyxos/php', // Use the value from the config as the default
            }
        ]);

        // Update the config with the potentially new projectSubPath
        config.projectSubPath = projectSubPathAnswer.projectSubPath;

        // Save the potentially updated config back to the file
        await writeJsonFile(getVisionConfigPath(), config);
    }

    return config;
}

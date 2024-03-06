import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import yaml from "js-yaml";
import {getVisionConfig, getVisionConfigPath} from "../../helpers/configPaths.mjs";
import {readJsonFile, writeJsonFile} from "../../helpers/jsonUtils.mjs";
import {exec} from "child_process";

import iconv from 'iconv-lite';

function listWslDistributions() {
    return new Promise((resolve, reject) => {
        exec('wsl -l -q', {encoding: 'buffer'}, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            // Convert from a potential UTF-16 buffer to a UTF-8 string
            const output = iconv.decode(stdout, 'utf-16le').trim();
            const distributions = output.split('\r\n');
            resolve(distributions);
        });
    });
}

export default async function ensureVisionConfigExists(mode = 'valet') {
    let config = {};

    if (mode === 'valet') {
        const visionConfigPath = getVisionConfigPath();

        let config = readJsonFile(visionConfigPath);

        // Check if Valet config already exists and is valid
        if (config.valet && config.valet.name && config.valet.path && config.valet.parkedAt) {
            console.log('Valet configuration already exists.');

            // Optional: Ask the user if they want to overwrite the existing configuration
            const overwrite = await inquirer.prompt([{
                name: 'overwrite',
                type: 'confirm',
                message: 'Valet configuration already exists. Do you want to overwrite it?',
                default: false
            }]);

            if (!overwrite.overwrite) {
                console.log('Skipping Valet setup.');
                return config.valet; // Exit the setup if user chooses not to overwrite
            }
        }

        const distributions = await listWslDistributions();
        const answers = await inquirer.prompt([
            {
                name: 'selectedDistribution',
                type: 'list',
                message: 'Select your WSL2 distribution:',
                choices: distributions,
            },
            {
                type: 'input',
                name: 'parkedAt',
                message: 'Enter the full path where your Valet projects are parked:',
                // You can include a default value or leave it empty for the user to fill
                default: config.valet && config.valet.parkedAt ? config.valet.parkedAt : '/home/username/code',
                validate: input => !!input || 'Valet projects path is required.'
            }
        ]);

        const selectedDistribution = answers.selectedDistribution;
        console.log(`Selected Distribution: ${selectedDistribution}`);

        // Use the WSL convention to access the root of the distribution from Windows
        const distributionPath = `\\\\wsl$\\${selectedDistribution}`;

        // Store the distribution name and the path
        config.valet = {
            name: selectedDistribution,
            path: distributionPath,
            parkedAt: answers.parkedAt
        };

        writeJsonFile(visionConfigPath, config);

        console.log(`Configuration updated with selected distribution and path.`);

        return config.valet
    }

    // Check if the config file exists
    const visionConfigPath = getVisionConfigPath();

    if (!fs.existsSync(visionConfigPath)) {
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

        config = {
            homestead: {
                ...baseConfig, ...projectConfig
            }
        };

        // Save the config for future use
        writeJsonFile(visionConfigPath, config);
    } else {
        // Read and return the existing config
        config = getVisionConfig();

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
        config.homestead.projectSubPath = projectSubPathAnswer.projectSubPath;

        // Save the potentially updated config back to the file
        writeJsonFile(visionConfigPath, config);
    }

    return config.homestead;
}

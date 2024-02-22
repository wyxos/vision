import {exec, execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Command from "../Command.mjs";
import inquirer from "inquirer";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), '.vision', 'config.json');

export default class SetupLaravel extends Command {
    signature = "setup:laravel <projectName>";
    description = "Automate setup of a Laravel project in Homestead.";

    async handle(projectName) {
        try {
            this.checkAdminPrivileges();
            const config = await this.getConfig();
            // Extract necessary parts from the config
            const {homesteadDir, projectMapping, projectSubPath} = config;

            // Adjust the createLaravelProject call to include new parameters
            await this.createLaravelProject(projectName, projectMapping, projectSubPath, homesteadDir)
            await this.updateHomesteadYaml(projectName, homesteadDir, projectMapping, projectSubPath)
            await this.updateWindowsHostsFile(projectName, homesteadDir)

            // Reload Homestead
            console.log('Reloading Homestead...');
            execSync(`cd /d "${homesteadDir}" && vagrant reload --provision`, {
                stdio: ['ignore', 'ignore', 'pipe'] // Ignore stdout and stdin, but capture stderr
            });

            // Correct Windows path for NPM operations
            const projectPathOnWindows = path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/');

            // Prompt for NPM package installation
            const {installNpm} = await inquirer.prompt({
                type: 'confirm',
                name: 'installNpm',
                message: 'Do you want to install NPM packages now?',
                default: true,
            });

            if (installNpm) {
                console.log('Installing NPM packages...');
                execSync(`cd "${projectPathOnWindows}" && npm install`, {stdio: 'inherit'});
            }

            // Prompt for compiling for development
            const {compileDev} = await inquirer.prompt({
                type: 'confirm',
                name: 'compileDev',
                message: 'Do you want to compile for development now?',
                default: true,
            });

            if (compileDev) {
                console.log('Compiling for development...');
                execSync(`cd "${projectPathOnWindows}" && npm run dev`, {stdio: 'inherit'});
            }

            console.log(`Laravel project created: ${projectName}`);
            console.log(`\nYou can now access your project at https://${projectName}.test`);
        } catch (error) {
            console.log(`Setup failed for ${projectName}: ${error.message}`);
            console.error(`Consider checking your Homestead.yaml configuration or ensuring your Homestead VM is running.`);
            throw error
        }
    }

    createLaravelProject(projectName, projectMapping, projectSubPath, homesteadDir) {
        return new Promise((resolve, reject) => {
            // Ensure we're executing the command in the Homestead directory
            // Windows CMD command to change directory and execute vagrant ssh
            console.log('SSH into Vagrant and creating the project...');
            const cmd = `cd /d "${homesteadDir}" && vagrant ssh -c "cd ${projectMapping.to.replace(/\\/g, '/')}/${projectSubPath} && laravel new ${projectName}"`;

            exec(cmd, {shell: 'cmd.exe'}, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error creating Laravel project: ${error}`);
                    return reject(error);
                }
                console.log(stdout);

                console.log(`Project ${projectName} created.`)
                resolve();
            });
        });
    }

    checkAdminPrivileges() {
        // Example operation that requires admin privileges
        try {
            fs.writeFileSync('C:\\Windows\\System32\\test.txt', 'test', {mode: 0o755});
            fs.unlinkSync('C:\\Windows\\System32\\test.txt');
        } catch (error) {
            throw new Error('Script must be run with administrative privileges.');
        }
    }

    updateHomesteadYaml(projectName, homesteadDir, projectMapping, projectSubPath) {
        console.log('Updating Homestead.yaml...');
        const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');
        const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
        let homesteadConfig = yaml.load(yamlContent);

        // Construct the correct 'to' path by incorporating the projectMapping and projectSubPath
        const fullPathTo = path.join(projectMapping.to, projectSubPath, projectName, "public").replace(/\\/g, '/');

        // Check if the site already exists
        const siteExists = homesteadConfig.sites.some(site => site.map === `${projectName}.test`);
        if (!siteExists) {
            homesteadConfig.sites.push({
                map: `${projectName}.test`,
                to: fullPathTo
            });
        } else {
            console.log(`Site entry for ${projectName}.test already exists.`);
        }

        // Check if the database already exists
        const dbExists = homesteadConfig.databases.includes(projectName);
        if (!dbExists) {
            homesteadConfig.databases.push(projectName);
        } else {
            console.log(`Database entry for ${projectName} already exists.`);
        }

        // Only write back to Homestead.yaml if changes were made
        if (!siteExists || !dbExists) {
            const newYamlContent = yaml.dump(homesteadConfig);
            fs.writeFileSync(homesteadPath, newYamlContent);
            console.log('Homestead.yaml updated successfully.');
        } else {
            console.log('No updates made to Homestead.yaml.');
        }
    }

    async updateWindowsHostsFile(projectName, homesteadDir) {
        console.log('Updating Windows hosts file...');
        // Define the path to the Homestead.yaml file
        const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');

        try {
            // Read the Homestead.yaml content
            const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
            const homesteadConfig = yaml.load(yamlContent);

            // Extract the IP address from the Homestead configuration
            const ipAddress = homesteadConfig.ip;

            // Define the hosts file path and the entry to append
            const hostsPath = 'C:/Windows/System32/drivers/etc/hosts';
            const entry = `${ipAddress} ${projectName}.test`;

            // Read the current content of the hosts file
            const hostsContent = fs.readFileSync(hostsPath, 'utf8');

            // Check if the entry already exists in the hosts file
            if (!hostsContent.includes(entry)) {
                // Append the new entry to the hosts file
                fs.appendFileSync(hostsPath, `\n${entry}`);
                console.log(`Windows hosts file updated with ${projectName}.test`);
            } else {
                console.log(`The host entry for ${projectName}.test already exists. No update needed.`);
            }
        } catch (error) {
            console.error(`Failed to update Windows hosts file: ${error.message}`);
            // Consider additional error handling or user instructions here
        }
    }

    async getConfig() {
        try {
            let config = {};

            // Check if the config file exists
            if (!fs.existsSync(CONFIG_PATH)) {
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
                this.saveConfig(config);
            } else {
                // Read and return the existing config
                config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

                // Prompt for projectSubPath regardless of whether the config exists
                const projectSubPathAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'projectSubPath',
                        message: 'Enter the subpath within the selected mapping for the project:',
                        default: config.projectSubPath || 'wyxos/php', // Use the value from the config as the default
                    }
                ]);

                // Update the config with the potentially new projectSubPath
                config.projectSubPath = projectSubPathAnswer.projectSubPath;

                // Save the potentially updated config back to the file
                this.saveConfig(config);
            }

            return config;
        } catch (error) {
            throw new Error(`Failed to get or create config: ${error.message}`);
        }
    }

    saveConfig(config) {
        const configDir = path.dirname(CONFIG_PATH);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, {recursive: true});
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
    }
}

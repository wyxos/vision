import {exec, execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Command from "../Command.mjs";
import inquirer from "inquirer";
import os from "os";
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

// Derive the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const CONFIG_PATH = path.join(os.homedir(), '.vision', 'config.json');

export default class MakeLaravel extends Command {
    signature = "make:laravel <projectName>";
    description = "Automate setup of a Laravel project in Homestead.";
    config = null
    projectName = null

    async handle(projectName) {
        this.projectName = projectName

        try {
            this.checkAdminPrivileges();
            this.config = await this.getConfig();
            // Extract necessary parts from the config
            const {homesteadDir, projectMapping, projectSubPath} = this.config;

            // Adjust the createLaravelProject call to include new parameters
            await this.createLaravelProject()
            await this.updateHomesteadYaml()
            await this.updateWindowsHostsFile(homesteadDir)

            await this.postSetup()

            // Reload Homestead
            console.log('Reloading Homestead...');
            this.execSyncSilent(`cd /d "${homesteadDir}" && vagrant reload --provision`);

            await this.copyStubsToProject()

            await this.updateEnvFile()

            await this.nodeDependencies()

            console.log(`Laravel project created: ${this.projectName}`);
            console.log(`\nYou can now access your project at https://${this.projectName}.test`);
        } catch (error) {
            console.log(`Setup failed for ${this.projectName}: ${error.message}`);
            console.error(`Consider checking your Homestead.yaml configuration or ensuring your Homestead VM is running.`);
            throw error
        }
    }

    copyStubsToProject() {
        console.log('Scaffolding...');
        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');

        // Your existing approach to determine the source directory
        const src = path.join(__dirname, '..', '..', 'stubs');
        const dest = projectPathOnWindows;

        // Start the copying process
        this.copyDirectoryRecursive(src, dest);

        // Git commands remain unchanged
        this.git('add .', projectPathOnWindows);
        this.git('commit -m "chore: scaffold"', projectPathOnWindows);
    }

    copyDirectoryRecursive(src, dest) {
        // Ensure the destination directory exists
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, {recursive: true});
        }

        // Read the source directory contents
        const entries = fs.readdirSync(src, {withFileTypes: true});

        entries.forEach(entry => {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                // Recurse into the subdirectory
                this.copyDirectoryRecursive(srcPath, destPath);
            } else {
                // Copy the file from srcPath to destPath
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }

    execSyncSilent(command, options = {}) {
        try {
            return execSync(command, {
                stdio: ['ignore', 'ignore', 'pipe'],
                ...options,
            })
        } catch (error) {
            console.error(`Command failed: ${error.message}`);
            throw error
        }
    }

    appendToFile(filePath, content) {
        fs.appendFileSync(filePath, content, {encoding: 'utf8'});
    }

    git(command, cwd) {
        this.execSyncSilent(`git ${command}`, {cwd});
    }

    getHomesteadProjectPath() {
        return path.join(this.config.projectMapping.to, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');
    }

    composer(command) {
        const cmd = `cd /d "${this.config.homesteadDir}" && vagrant ssh -c "cd ${this.getHomesteadProjectPath()} && composer ${command}"`;
        try {
            execSync(cmd, {stdio: 'inherit'});
        } catch (error) {
            console.error(`Composer command failed: ${error}`);
            throw new Error(`Failed to execute composer command: ${command}`);
        }
    }

    artisan(command) {
        const cmd = `cd /d "${this.config.homesteadDir}" && vagrant ssh -c "cd ${this.getHomesteadProjectPath()} && php artisan ${command}"`;
        try {
            execSync(cmd, {stdio: 'inherit'});
        } catch (error) {
            console.error(`Artisan command failed: ${error}`);
            throw new Error(`Failed to execute artisan command: ${command}`);
        }
    }

    async updateEnvFile() {
        const projectPath = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');
        const envFilePath = path.join(projectPath, '.env');
        const envContents = fs.readFileSync(envFilePath, 'utf-8');
        const lines = envContents.split(/\r?\n/);

        // Extract the domain from APP_URL
        const appUrlMatch = envContents.match(/^APP_URL=(https?:\/\/)?(.+)$/m);
        const appDomain = appUrlMatch ? appUrlMatch[2] : 'example.test';

        const updatedLines = lines.map(line => {
            if (line.startsWith('APP_URL=')) {
                return `APP_URL=https://\${appDomain}`;
            } else if (line.startsWith('DB_USERNAME=')) {
                return 'DB_USERNAME=homestead';
            } else if (line.startsWith('DB_PASSWORD=')) {
                return 'DB_PASSWORD=secret';
            } else if (line.startsWith('MAIL_FROM_ADDRESS=')) {
                return `MAIL_FROM_ADDRESS=hello@$\${appDomain}`;
            } else {
                return line;
            }
        });

        // Add new entries
        updatedLines.push(`APP_DOMAIN=\${appDomain}`);
        updatedLines.push(`SANCTUM_STATEFUL_DOMAINS=\${appDomain}`);
        updatedLines.push(`SESSION_DOMAIN=.\${appDomain}`);
        updatedLines.push(`SESSION_SECURE_COOKIE=true`);

        // Write the updated content back to the .env file
        fs.writeFileSync(envFilePath, updatedLines.join('\n'));
    }

    async nodeDependencies() {
        // Correct Windows path for NPM operations
        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');

        // Prompt for NPM package installation
        // const {installNpm} = await inquirer.prompt({
        //     type: 'confirm',
        //     name: 'installNpm',
        //     message: 'Do you want to install NPM packages now?',
        //     default: true,
        // });

        // if (installNpm) {
        console.log('Installing NPM packages...');
        this.execSyncSilent(`cd "${projectPathOnWindows}" && npm install`);
        // }

        // Prompt for opening the project in PHPStorm
        // const {openInPhpStorm} = await inquirer.prompt({
        //     type: 'confirm',
        //     name: 'openInPhpStorm',
        //     message: 'Do you want to open the project in PHPStorm now?',
        //     default: false, // Defaulting to false to not assume all users utilize PHPStorm
        // });
        //
        // if (openInPhpStorm) {
        //     console.log('Opening the project in PHPStorm...');
        // }
        this.execSyncSilent(`cd "${projectPathOnWindows}" && ps .`, {shell: true});

        // Prompt for compiling for development
        // const {compileDev} = await inquirer.prompt({
        //     type: 'confirm',
        //     name: 'compileDev',
        //     message: 'Do you want to compile for development now?',
        //     default: true,
        // });

        // if (compileDev) {
        //     console.log('Compiling for development...');
        //     this.execSyncSilent(`cd "${projectPathOnWindows}" && npm run dev`);
        // }
    }

    async postSetup() {
        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');

        try {
            try {
                // Construct the path to the composer.lock file
                const composerLockPath = path.join(projectPathOnWindows, 'composer.lock');

                // Check if the file exists before trying to delete it
                if (fs.existsSync(composerLockPath)) {
                    fs.unlinkSync(composerLockPath);
                    console.log('composer.lock removed successfully.');
                } else {
                    console.log('composer.lock does not exist, no need to remove.');
                }
            } catch (error) {
                console.error(`Failed to remove composer.lock: ${error.message}`);
                throw error
            }

            // Append entries to .gitignore
            const gitignorePath = path.join(projectPathOnWindows, '.gitignore');
            this.appendToFile(gitignorePath, '/package-lock.json\n/composer.lock\n/.env.testing\n');

            console.log('Initializing git...');
            this.git('init', projectPathOnWindows);

            this.git('add .', projectPathOnWindows);

            this.git('commit -m "feat: initial commit"', projectPathOnWindows);

            await this.installComposerDependencies()

            await this.installNodeDevDependencies()

            console.log('Post-setup tasks completed successfully.');
        } catch (error) {
            console.error(`Post-setup tasks failed: ${error.message}`);
            // Handle errors or rethrow as needed
            throw error
        }
    }

    async installNodeDevDependencies() {
        console.log('Installing node dependencies...')
        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');

        const devDependencies = [
            'laravel-vite-plugin',
            'vite-plugin-mkcert',
            '@vitejs/plugin-vue',
            'vue vue-router',
            '@oruga-ui/oruga-next',
            '@tailwindcss/forms',
            '@tailwindcss/typography',
            'vue-inline-svg',
            '@tailwindcss/nesting',
            'postcss-import',
            '@wyxos/vision',
            'eslint',
            'eslint-config-prettier',
            'eslint-config-standard',
            'eslint-plugin-import',
            'eslint-plugin-json',
            'eslint-plugin-n',
            'eslint-plugin-node',
            'eslint-plugin-promise',
            'eslint-plugin-vue',
            'prettier',
            '@prettier/plugin-php',
            'vite-plugin-eslint',
        ];

        try {
            this.execSyncSilent(`npm install -D ${devDependencies.join(' ')}`, {
                cwd: projectPathOnWindows // Ensure this is the path to the project root in Windows
            });

            this.git('add .', projectPathOnWindows);

            this.git('commit -m "chore: node dependencies"', projectPathOnWindows);

            console.log('Node dependencies installed successfully.');
        } catch (error) {
            console.error(`Failed to install NPM dev dependencies: ${error.message}`);
            // Handle or rethrow error as needed
        }
    }

    createLaravelProject() {
        const {projectMapping, projectSubPath, homesteadDir} = this.config

        return new Promise((resolve, reject) => {
            // Ensure we're executing the command in the Homestead directory
            // Windows CMD command to change directory and execute vagrant ssh
            console.log('SSH into Vagrant and creating the project...');
            const cmd = `cd /d "${homesteadDir}" && vagrant ssh -c "cd ${projectMapping.to.replace(/\\/g, '/')}/${projectSubPath} && laravel new ${this.projectName}"`;

            exec(cmd, {shell: 'cmd.exe'}, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error creating Laravel project: ${error}`);
                    return reject(error);
                }
                console.log(stdout);

                console.log(`Project ${this.projectName} created.`)
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

    updateHomesteadYaml() {
        const {homesteadDir, projectMapping, projectSubPath} = this.config
        console.log('Updating Homestead.yaml...');
        const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');
        const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
        let homesteadConfig = yaml.load(yamlContent);

        // Construct the correct 'to' path by incorporating the projectMapping and projectSubPath
        const fullPathTo = path.join(projectMapping.to, projectSubPath, this.projectName, "public").replace(/\\/g, '/');

        // Check if the site already exists
        const siteExists = homesteadConfig.sites.some(site => site.map === `${this.projectName}.test`);
        if (!siteExists) {
            homesteadConfig.sites.push({
                map: `${this.projectName}.test`,
                to: fullPathTo
            });
        } else {
            console.log(`Site entry for ${this.projectName}.test already exists.`);
        }

        // Check if the database already exists
        const dbExists = homesteadConfig.databases.includes(this.projectName);
        if (!dbExists) {
            homesteadConfig.databases.push(this.projectName);
        } else {
            console.log(`Database entry for ${this.projectName} already exists.`);
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

    async updateWindowsHostsFile(homesteadDir) {
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
            const entry = `${ipAddress} ${this.projectName}.test`;

            // Read the current content of the hosts file
            const hostsContent = fs.readFileSync(hostsPath, 'utf8');

            // Check if the entry already exists in the hosts file
            if (!hostsContent.includes(entry)) {
                // Append the new entry to the hosts file
                fs.appendFileSync(hostsPath, `\n${entry}`);
                console.log(`Windows hosts file updated with ${this.projectName}.test`);
            } else {
                console.log(`The host entry for ${this.projectName}.test already exists. No update needed.`);
            }
        } catch (error) {
            console.error(`Failed to update Windows hosts file: ${error.message}`);
            // Consider additional error handling or user instructions here

            throw error
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

    async installComposerDependencies() {
        console.log('Installing php dependencies...');
        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, this.projectName).replace(/\\/g, '/');

        // Composer and Artisan commands
        this.composer('require wyxos/harmonie');

        this.composer('require laravel/breeze --dev');

        this.artisan('breeze:install blade --no-interaction');

        this.composer('require laravel/horizon')

        this.artisan('horizon:install');

        this.composer('require laravel/scout')

        this.artisan('vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"')

        this.composer('require spatie/laravel-permission')

        this.artisan('vendor:publish --provider="Spatie\\Permission\\PermissionServiceProvider"')

        this.composer('require spatie/laravel-tags')

        this.artisan('vendor:publish --provider="Spatie\\Tags\\TagsServiceProvider" --tag="tags-migrations"')

        this.composer('require barryvdh/laravel-debugbar --dev')

        this.git('add .', projectPathOnWindows);

        this.git('commit -m "chore: php dependencies"', projectPathOnWindows);
    }
}

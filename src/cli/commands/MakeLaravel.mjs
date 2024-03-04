import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Command from "../Command.mjs";
import ensureVisionConfigExists from "../command-helpers/MakeLaravel/ensureVisionConfigExists.mjs";
import {getVisionConfig} from "../helpers/configPaths.mjs";
import {
    artisan,
    checkAdminPrivileges,
    composer, execSyncSilent,
    getHomesteadProjectPath,
    getProjectPathOnWindows,
    git
} from "../helpers/cliInteractions.mjs";
import {fileURLToPath} from "url";
import {appendToFile} from "../helpers/fileInteractions.mjs";
import {spawn} from 'node:child_process'
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stubsPath = path.join(__dirname, '../../../stubs/MakeLaravel');

export default class MakeLaravel extends Command {
    signature = "make:laravel <projectName>";
    description = "Automate setup of a Laravel project in Homestead.";
    config = null
    projectName = null

    async handle(projectName) {
        this.projectName = projectName

        try {
            checkAdminPrivileges();

            await ensureVisionConfigExists()

            this.config = getVisionConfig();

            await this.createLaravelProject()
            await this.updateHomesteadYaml()
            await this.updateWindowsHostsFile()

            await this.postSetup()

            await this.copyStubs(this.projectName)

            await this.updateEnvFile()

            await this.nodeDependencies()

            console.log('Reloading Homestead...');
            execSyncSilent(`cd /d "${this.config.homesteadDir}" && vagrant reload --provision`);

            console.log(`Laravel project created: ${this.projectName}`);
            console.log(`\nYou can now access your project at https://${this.projectName}.test`);
        } catch (error) {
            console.log(`Setup failed for ${this.projectName}: ${error.message}`);
            console.error(`Consider checking your Homestead.yaml configuration or ensuring your Homestead VM is running.`);
            throw error
        }
    }

    copyStubs(projectName) {
        console.log('Scaffolding...');

        const config = getVisionConfig()
        const projectPathOnWindows = path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/');

        // Start the copying process
        this.copyDirectoryRecursive(stubsPath, projectPathOnWindows);

        // Git commands remain unchanged
        git('add .', projectPathOnWindows);
        git('commit -m "chore: scaffold"', projectPathOnWindows);
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

    async updateEnvFile() {
        const projectPath = getProjectPathOnWindows(this.config, this.projectName);
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
        updatedLines.push(`APP_DOMAIN=${appDomain}`);
        updatedLines.push(`SANCTUM_STATEFUL_DOMAINS=\${appDomain}`);
        updatedLines.push(`SESSION_DOMAIN=.\${appDomain}`);
        updatedLines.push(`SESSION_SECURE_COOKIE=true`);

        // Write the updated content back to the .env file
        fs.writeFileSync(envFilePath, updatedLines.join('\n'));
    }

    async nodeDependencies() {
        // Correct Windows path for NPM operations
        const projectPathOnWindows = getProjectPathOnWindows(this.config, this.projectName);

        console.log('Installing NPM packages...');
        execSyncSilent(`cd "${projectPathOnWindows}" && npm install`);

        execSyncSilent(`cd "${projectPathOnWindows}" && ps .`, {shell: true});
    }

    async postSetup() {
        const projectPathOnWindows = getProjectPathOnWindows(this.config, this.projectName);

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
        appendToFile(gitignorePath, '/package-lock.json\n/composer.lock\n/.env.testing\n');

        console.log('Initializing git...');
        git('init', projectPathOnWindows);

        git('add .', projectPathOnWindows);

        git('commit -m "feat: initial commit"', projectPathOnWindows);

        await this.installComposerDependencies()

        await this.installNodeDevDependencies(this.projectName)

        console.log('Post-setup tasks completed successfully.');
    }

    installComposerDependencies() {
        console.log('Installing php dependencies...');

        const projectPathOnWindows = getProjectPathOnWindows(this.config, this.projectName);

        const homesteadProjectPath = getHomesteadProjectPath(this.projectName);

        composer(homesteadProjectPath, 'require wyxos/harmonie');

        composer(homesteadProjectPath, 'require laravel/breeze --dev');

        artisan(homesteadProjectPath, 'breeze:install blade --no-interaction');

        composer(homesteadProjectPath, 'require laravel/horizon')

        artisan(homesteadProjectPath, 'horizon:install');

        composer(homesteadProjectPath, 'require laravel/scout')

        artisan(homesteadProjectPath, 'vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"')

        composer(homesteadProjectPath, 'require spatie/laravel-permission')

        artisan(homesteadProjectPath, 'vendor:publish  --provider="Spatie\\Permission\\PermissionServiceProvider"')

        composer(homesteadProjectPath, 'require spatie/laravel-tags')

        artisan(homesteadProjectPath, 'vendor:publish --provider="Spatie\\Tags\\TagsServiceProvider"' +
            ' --tag="tags-migrations"')

        composer(homesteadProjectPath, 'require barryvdh/laravel-debugbar --dev')

        git('add .', projectPathOnWindows);

        git('commit -m "chore: php dependencies"', projectPathOnWindows);
    }

    async installNodeDevDependencies() {
        console.log('Installing node dependencies...')
        const projectPathOnWindows = getProjectPathOnWindows(this.config, this.projectName);

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

        execSyncSilent(`npm install -D ${devDependencies.join(' ')}`, {
            cwd: projectPathOnWindows // Ensure this is the path to the project root in Windows
        });

        git('add .', projectPathOnWindows);

        git('commit -m "chore: node dependencies"', projectPathOnWindows);

        console.log('Node dependencies installed successfully.');
    }

    createLaravelProject() {
        const {projectMapping, projectSubPath, homesteadDir} = this.config;

        return new Promise(async (resolve, reject) => {
            console.log('Checking if the project already exists...');
            const projectPath = getHomesteadProjectPath(this.projectName);
            const checkCmd = `cd /d "${homesteadDir}" && vagrant ssh -c "if [ -d '${projectPath}' ]; then echo 'exists'; else echo 'not exists'; fi"`;

            const localProjectPath = getProjectPathOnWindows(this.config, this.projectName);

            try {
                const exists = execSync(checkCmd, {shell: 'cmd.exe'}).toString().trim();

                if (exists === 'exists') {
                    const answers = await inquirer.prompt([{
                        name: 'overwrite',
                        type: 'confirm',
                        message: `Project ${this.projectName} already exists. Overwrite?`,
                        default: false
                    }]);

                    if (!answers.overwrite) {
                        console.log('Project creation cancelled.');
                        return reject(Error('Cannot proceed.'));
                    }

                    console.log('Deleting existing project...');
                    fs.rmSync(localProjectPath, {recursive: true, force: true});
                }

                console.log('SSH into Vagrant and creating the project...');
                const cmd = `cd /d "${homesteadDir}" && vagrant ssh -c "cd ${projectMapping.to.replace(/\\/g, '/')}/${projectSubPath} && laravel new ${this.projectName}"`;

                // Split the command by spaces to pass into spawn
                const parts = cmd.split(' ');
                const process = spawn(parts[0], parts.slice(1), {shell: 'cmd.exe'});

                process.stdout.on('data', (data) => {
                    console.log(data.toString());
                });

                process.stderr.on('data', (data) => {
                    console.error(data.toString());
                });

                process.on('exit', (code) => {
                    if (code !== 0) {
                        console.error(`Error creating Laravel project with exit code ${code}`);
                        return reject(`Exit code ${code}`);
                    }
                    console.log(`Project ${this.projectName} created.`);
                    resolve();
                });
            } catch (error) {
                console.error(`Command failed: ${error.message}`);
                reject(error);
            }
        });
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

    async updateWindowsHostsFile() {
        const {homesteadDir} = this.config
        console.log('Updating Windows hosts file...');
        // Define the path to the Homestead.yaml file
        const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');

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
    }
}

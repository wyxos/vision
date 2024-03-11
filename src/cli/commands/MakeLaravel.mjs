import fs from 'fs';
import path from 'path';
import Command from "../Command.mjs";
import ensureVisionConfigExists from "../command-helpers/MakeLaravel/ensureVisionConfigExists.mjs";
import {
    checkAdminPrivileges,
    execSyncSilent,
    getProjectPathOnWindows,
    git
} from "../helpers/cliInteractions.mjs";
import {fileURLToPath} from "url";
import {appendToFile} from "../helpers/fileInteractions.mjs";
import projectDependencies from "../command-helpers/MakeLaravel/ProjectDependencies.mjs";
import fileUpdater from "../command-helpers/MakeLaravel/FileUpdater.mjs";
import projectCreator from "../command-helpers/MakeLaravel/ProjectCreator.mjs";
import {execSync} from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stubsPath = path.join(__dirname, '../../../stubs/MakeLaravel');


export default class MakeLaravel extends Command {
    signature = "make:laravel <projectName>";
    description = "Automate setup of a Laravel project in Homestead.";
    config = null
    projectName = null

    getOptions() {
        return [
            {flag: '--mode <mode>', description: 'Specify the setup mode (homestead or valet)', defaultValue: 'valet'},
        ];
    }

    isValet() {
        return this.mode === 'valet'
    }

    async handle(projectName, options) {
        this.projectName = projectName

        this.mode = options.mode || 'valet';

        try {
            if (this.mode === 'homestead') {
                await this.homesteadSetup()
            } else if (this.isValet()) {
                await this.valetSetup()
            }
        } catch (error) {
            console.log(`Setup failed for ${this.projectName}: ${error.message}`);
            throw error
        }
    }

    async valetSetup() {
        checkAdminPrivileges();

        this.config = await ensureVisionConfigExists(this.mode)

        await projectCreator.create(this)

        await fileUpdater.updateWindowsHostsFile(this)
    }

    async homesteadSetup() {
        checkAdminPrivileges();

        this.config = await ensureVisionConfigExists(this.mode)

        await projectCreator.create(this)

        fileUpdater.updateHomesteadYaml(this)

        fileUpdater.updateWindowsHostsFile(this)

        await this.postSetup()

        await this.copyStubs(this.projectName)

        fileUpdater.updateEnvFile(this)

        await this.npmInstall()

        console.log('Reloading Homestead...');
        execSyncSilent(`cd /d "${this.config.homesteadDir}" && vagrant reload --provision`);

        console.log(`Laravel project created: ${this.projectName}`);
        console.log(`\nYou can now access your project at https://${this.projectName}.test`);
    }

    copyStubs(projectName) {
        console.log('Scaffolding...');

        const projectPathOnWindows = path.join(this.config.projectMapping.map, this.config.projectSubPath, projectName).replace(/\\/g, '/');

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

    async npmInstall() {
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

        projectDependencies.installComposerDependencies(this)

        projectDependencies.installNodeDependencies(this)

        console.log('Post-setup tasks completed successfully.');
    }
}

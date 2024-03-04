// cliInteractions.mjs
import readline from 'readline';
import path from "path";
import {execSync} from "child_process";
import {getVisionConfig, getVisionConfigPath} from "./configPaths.mjs";
import {readJsonFile} from "./jsonUtils.mjs";
import fs from "fs";

/**
 * Creates a readline interface.
 * @returns {readline.Interface}
 */
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

/**
 * Asks a question and gets user input.
 * @param {String} question - The question to prompt the user.
 * @returns {Promise<String>} - The user's input.
 */
export function askQuestion(question) {
    const rl = createReadlineInterface();
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export function getProjectPath() {
    return process.cwd()
}

export function getProjectName() {
    return path.basename(getProjectPath());
}

export function getGitignorePath() {
    return path.join(getProjectPath(), '.gitignore')
}

export function execSyncSilent(command, options = {}) {
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

export function git(command, cwd) {
    execSyncSilent(`git ${command}`, {cwd});
}

export function getHomesteadProjectPath(projectName) {
    if (!projectName) {
        throw Error('Project name required.')
    }

    const config = readJsonFile(getVisionConfigPath())

    return path.join(config.projectMapping.to, config.projectSubPath, projectName).replace(/\\/g, '/')
}

export function getProjectPathOnWindows(config, projectName) {
    return path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/')
}

export function composer(homesteadPath, command) {
    const config = getVisionConfig()

    const cmd = `cd /d "${config.homesteadDir}" && vagrant ssh -c "cd ${homesteadPath} && composer ${command}"`;
    try {
        execSync(cmd, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Composer command failed: ${error}`);
        throw new Error(`Failed to execute composer command: ${command}`);
    }
}

export function artisan(homesteadPath, command) {
    const config = getVisionConfig()

    const cmd = `cd /d "${config.homesteadDir}" && vagrant ssh -c "cd ${homesteadPath} && php artisan ${command}"`;
    try {
        execSync(cmd, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Artisan command failed: ${error}`);
        throw new Error(`Failed to execute artisan command: ${command}`);
    }
}

export function checkAdminPrivileges() {
    try {
        fs.writeFileSync('C:\\Windows\\System32\\test.txt', 'test', {mode: 0o755});
        fs.unlinkSync('C:\\Windows\\System32\\test.txt');
    } catch (error) {
        throw new Error('Script must be run with administrative privileges.');
    }
}

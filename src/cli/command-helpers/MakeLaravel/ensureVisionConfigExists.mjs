import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import yaml from "js-yaml";
import {getVisionConfig, getVisionConfigPath} from "../../helpers/configPaths.mjs";
import {readJsonFile, writeJsonFile} from "../../helpers/jsonUtils.mjs";
import {execSync} from "child_process";

async function listSshKeys() {
    const sshDir = path.join(process.env.HOME || process.env.USERPROFILE, '.ssh');
    try {
        const files = fs.readdirSync(sshDir);
        return files.filter(file => file.endsWith('.pub')).map(file => {
            const privateKeyPath = path.join(sshDir, file.replace('.pub', ''));
            return {name: file, value: privateKeyPath};
        });
    } catch (error) {
        console.error('No SSH keys found. Please ensure SSH keys are generated.');
        process.exit(1);
    }
}

async function ensureValetConfig() {
    const visionConfigPath = getVisionConfigPath();
    let config = {};

    if (fs.existsSync(visionConfigPath)) {
        config = readJsonFile(visionConfigPath);
    } else {
        config = {valet: {}};
    }

    if (!config.valet.sshPath || !config.valet.wslDistro || !config.valet.parkedAt || !config.valet.username) {
        const distrosRaw = execSync('wsl -l -q', {encoding: 'utf16le'});
        const distros = distrosRaw.split('\r\n').filter(distro => distro.trim() !== '')
            .filter(value => !value.includes('docker'));

        const sshKeys = await listSshKeys();

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'wslDistro',
                message: 'Select the WSL distribution to use:',
                choices: distros.map(distro => ({name: distro, value: distro})),
            },
            {
                type: 'list',
                name: 'sshPath',
                message: 'Select the SSH public key to use:',
                choices: sshKeys,
            },
            {
                type: 'input',
                name: 'parkedAt',
                message: 'Enter the  full path where Valet is parked:',
                validate: input => !!input.trim() || 'Parked path is required.',
                default: '/home/username/code',
            },
            {
                type: 'input',
                name: 'username',
                message: 'Enter the username to authenticate on your distro:',
                validate: input => !!input.trim() || 'Username path is required.',
                default: 'username',
            }
        ]);

        const wslDistroIp = execSync(`wsl -d ${answers.wslDistro} -- hostname -I`).toString().trim();

        config.valet = {
            ...config.valet,
            wslDistro: answers.wslDistro,
            wslDistroIp: wslDistroIp,
            username: answers.username,
            sshPath: answers.sshPath,
            parkedAt: answers.parkedAt,
        };

        writeJsonFile(visionConfigPath, config);
    }

    return config.valet;
}

async function ensureHomesteadConfig() {
    const visionConfigPath = getVisionConfigPath();

    let config = readJsonFile(visionConfigPath);

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

export default async function ensureVisionConfigExists(mode = 'valet') {
    if (mode === 'valet') {
        return ensureValetConfig()
    }

    return ensureHomesteadConfig()
}

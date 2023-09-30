import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer';
import {fileURLToPath} from 'url';
import { execSync } from "child_process";
import os from 'os';
import { NodeSSH } from 'node-ssh'
import Command from "../Command.mjs";

const ssh = new NodeSSH()

const sshDir = `${os.homedir()}/.ssh`;
let sshFiles = [];

if (fs.existsSync(sshDir)) {
    sshFiles = fs.readdirSync(sshDir).filter(file => file.includes('id_rsa'));
}

const homesteadConfigPath = path.join(process.cwd(), 'homestead-ssh.json');

async function getHomesteadConfig() {
    let configFileCreated = false;

    if (fs.existsSync(homesteadConfigPath)) {
        return JSON.parse(fs.readFileSync(homesteadConfigPath, "utf8"));
    }

    const projectName = path.basename(process.cwd());

    const questions = [
        {
            type: 'input',
            name: 'ip',
            message: 'Enter the IP address:',
            default: '192.168.56.56',
        },
        {
            type: 'input',
            name: 'username',
            message: 'Enter the username:',
            default: 'vagrant',
        },
        {
            type: 'list',
            name: 'sshPath',
            message: 'Select the SSH key:',
            choices: sshFiles.map(file => path.join(sshDir, file)),
            default: sshFiles[0] || 'id_rsa',
        },
        {
            type: 'input',
            name: 'projectPath',
            message: 'Enter the project path:',
            default: `/home/vagrant/code/${projectName}`,
        },
    ];

    const answers = await inquirer.prompt(questions);

    fs.writeFileSync(homesteadConfigPath, JSON.stringify(answers, null, 2));

    configFileCreated = true;

    // Add to .gitignore if the config file was created
    if (configFileCreated) {
        const gitignorePath = path.join(process.cwd(), '.gitignore');
        let gitignoreContent = "";

        // Read existing .gitignore if it exists
        if (fs.existsSync(gitignorePath)) {
            gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        }

        // Add entry to .gitignore if not already present
        if (!gitignoreContent.includes('homestead-ssh.json')) {
            gitignoreContent += '\nhomestead-ssh.json';
            fs.writeFileSync(gitignorePath, gitignoreContent);
        }
    }

    return answers;
}

export default class ToggleHarmonie extends Command {
    signature = "toggle:harmonie"

    description = "Toggle wyxos/harmonie vendor between local and online versions"

    async handle(){
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        const composerPath = path.join(process.cwd(), 'composer.json')

        if (!fs.existsSync(composerPath)) {
            console.log("composer.json not found")
            process.exit(1)
        }

        const composerJSON = JSON.parse(fs.readFileSync(composerPath, 'utf8'))
        const packageName = 'wyxos/harmonie'
        const localPaths = [
            '../../../wyxos/php/harmonie',
            '../../harmonie'
        ]

        const { ip, username, sshPath, projectPath } = await getHomesteadConfig()

        try {
            await ssh.connect({
                host: ip,
                username: username,
                privateKey: fs.readFileSync(sshPath).toString('utf8'),
            })

            if (composerJSON.repositories && composerJSON.repositories.some(repo => repo.type === 'path' && localPaths.includes(repo.url))) {
                const result = await ssh.execCommand(`composer show ${packageName} --latest`, { cwd: projectPath })

                const latestVersion = result.stdout.split('\n')
                    .find(line => line.includes('versions'))
                    .split(':')
                    .pop()
                    .trim()
                    .match(/\d+\.\d+/)[0];

                composerJSON.require[packageName] = `^${latestVersion}`
                composerJSON.repositories = composerJSON.repositories.filter(repo => repo.type !== 'path' || !localPaths.includes(repo.url));
                fs.writeFileSync(composerPath, JSON.stringify(composerJSON, null, 2))
                console.log(`Toggled ${packageName}`)

                await ssh.execCommand('composer update', { cwd: projectPath })
            } else {
                // Switch to local version
                if (!composerJSON.repositories) {
                    composerJSON.repositories = []
                }

                const existingPath = localPaths.find(p => fs.existsSync(path.join(__dirname, p))) || localPaths[0]
                composerJSON.repositories.push({
                    "type": "path",
                    "url": existingPath,
                    "options": { "symlink": true }
                })

                composerJSON.require[packageName] = '*'
                fs.writeFileSync(composerPath, JSON.stringify(composerJSON, null, 2))

                await ssh.execCommand('composer update', { cwd: projectPath })
            }
        } catch (error) {
            console.error('Failed:', error)
        } finally {
            ssh.dispose()
        }
    }
}

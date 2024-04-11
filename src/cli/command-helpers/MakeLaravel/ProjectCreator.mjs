import {execSync} from "child_process";
import inquirer from "inquirer";
import {spawn} from "node:child_process";
import {getHomesteadProjectPath, getProjectPathOnWindows} from "../../helpers/cliInteractions.mjs";
import fs from "fs";
import {NodeSSH} from 'node-ssh';

class ProjectCreator {
    constructor() {
        this.ssh = new NodeSSH();
    }

    create(command) {
        if (command.isValet()) {
            return this.valetSetup(command)
        } else {
            return this.homesteadSetup()
        }
    }

    async valetSetup(command) {
        const {username, wslDistroIp, parkedAt, sshPath} = command.config;
        const projectName = command.projectName;
        const projectPath = `${parkedAt}/${projectName}`;

        await this.ssh.connect({
            host: wslDistroIp,
            username: username,
            privateKeyPath: sshPath,
        });

        const projectExistsCommand = `test -d "${projectPath}" && echo "exists" || echo "not exists"`;
        const result = await this.ssh.execCommand(projectExistsCommand, {cwd: '/'});
        if (result.stdout.trim() === 'exists') {
            const answers = await inquirer.prompt([{
                name: 'overwrite',
                type: 'confirm',
                message: `Project ${projectName} already exists. Overwrite?`,
                default: false
            }]);

            if (!answers.overwrite) {
                console.log('Project creation cancelled.');
                return;
            }
            // Use rm -R for recursive deletion
            await this.ssh.execCommand(`rm -R "${projectPath}"`);
            console.log(`Existing project ${projectName} deleted.`);
        }

        console.log(`Creating new project ${projectName}...`);
        // Updated part to use exec for real-time output
        const laravelCommand = `source ~/.bashrc && cd ${parkedAt} && /home/leshrac/.config/composer/vendor/bin/laravel new ${projectName} --breeze --stack=blade --verification -n`;

        await this.ssh.execCommand(laravelCommand, {
            cwd: '/',
            onStdout(chunk) {
                console.log(chunk.toString('utf8'));
            },
            onStderr(chunk) {
                console.error(chunk.toString('utf8'));
            },
        });

        console.log(`Project ${projectName} created successfully.`);

        // Execute valet secure at the project location
        console.log(`Securing project ${projectName} with Valet...`);
        const valetSecureCommand = `cd ${projectPath} && sudo valet secure`;
        const secureResult = await this.ssh.execCommand(valetSecureCommand, {
            cwd: '/',
            onStdout(chunk) {
                console.log(chunk.toString('utf8'));
            },
            onStderr(chunk) {
                console.error(chunk.toString('utf8'));
            },
        });

        if (secureResult.code === 0) {
            console.log(`Project ${projectName} secured successfully.`);
        } else {
            console.error(`Failed to secure project ${projectName}.`);
        }

        this.ssh.dispose();
    }

    homesteadSetup(command) {
        const {projectMapping, projectSubPath, homesteadDir} = command.config;

        return new Promise(async (resolve, reject) => {
            console.log('Checking if the project already exists...');
            const projectPath = getHomesteadProjectPath(command.projectName);
            const checkCmd = `cd /d "${homesteadDir}" && vagrant ssh -c "if [ -d '${projectPath}' ]; then echo 'exists'; else echo 'not exists'; fi"`;

            const localProjectPath = getProjectPathOnWindows(command.config, command.projectName);

            try {
                const exists = execSync(checkCmd, {shell: 'cmd.exe'}).toString().trim();

                if (exists === 'exists') {
                    const answers = await inquirer.prompt([{
                        name: 'overwrite',
                        type: 'confirm',
                        message: `Project ${command.projectName} already exists. Overwrite?`,
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
                const cmd = `cd /d "${homesteadDir}" && vagrant ssh -c "cd ${projectMapping.to.replace(/\\/g, '/')}/${projectSubPath} && laravel new ${command.projectName}"`;

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
                    console.log(`Project ${command.projectName} created.`);
                    resolve();
                });
            } catch (error) {
                console.error(`Command failed: ${error.message}`);
                reject(error);
            }
        });
    }
}

export default new ProjectCreator()

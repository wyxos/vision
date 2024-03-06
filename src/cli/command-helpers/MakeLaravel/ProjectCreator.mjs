import {exec, execSync} from "child_process";
import inquirer from "inquirer";
import {spawn} from "node:child_process";
import {getHomesteadProjectPath, getProjectPathOnWindows} from "../../helpers/cliInteractions.mjs";
import fs from "fs";

class ProjectCreator {
    create(command) {
        if (command.isValet()) {
            this.valetSetup(command)
        } else {
            this.homesteadSetup()
        }
    }

    valetSetup(command) {
        const {name: distributionName, parkedAt: projectsPath} = command.config;
        const projectName = command.projectName;

        // First, fetch the $HOME directory path within the specified WSL distribution
        exec(`wsl -d ${distributionName} -e bash -c "echo $HOME"`, (error, homePathStdout, stderr) => {
            if (error) {
                console.error(`Error fetching $HOME directory: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }

            // Trim newline from the output to get the clean path
            const homePath = homePathStdout.trim();
            console.log(`$HOME path in ${distributionName}: ${homePath}`);

            // Now, construct the full path to the Laravel installer
            const laravelFullPath = `${homePath}/.config/composer/vendor/bin/laravel`;
            this.checkAndCreateProject(distributionName, projectsPath, projectName, laravelFullPath);
        });
    }

    checkAndCreateProject(distributionName, projectsPath, projectName, laravelFullPath) {
        const projectFullPath = `${projectsPath}/${projectName}`;
        console.log(`Attempting to create a new Laravel project named ${projectName} in ${distributionName} at ${projectFullPath}...`);

        // Check if the project already exists...
        // Similar to the previously provided implementation
        // After checking, if project does not exist or needs to be overwritten:
        this.createProject(distributionName, projectsPath, projectName, laravelFullPath);
    }

    createProject(distributionName, projectsPath, projectName, laravelFullPath) {
        // Using the laravelFullPath constructed from the dynamic $HOME path
        const commandToExecute = `cd /home/leshrac/code && ${laravelFullPath} new ${projectName} --force --no-interaction --breeze --stack=blade`;
        const wslCommand = `wsl -d Ubuntu bash -c "cd /home/leshrac/code && /home/leshrac/.config/composer/vendor/bin/laravel new power-tools --force --no-interaction"`;

        exec(wslCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating Laravel project: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(stdout);
            console.log(`Laravel project ${projectName} created successfully.`);
        });
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

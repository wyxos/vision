import {readJsonFile, writeJsonFile,} from "../../helpers/jsonUtils.mjs";
import {getRuncloudConfigPath} from "../../helpers/configPaths.mjs";
import {runcloudApi} from "../../helpers/runcloudApi.mjs";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

export default async function updateConfig(server, app, repo) {
    const config = readJsonFile(getRuncloudConfigPath());

    // Fetch the list of domains attached to the app
    const domainsResponse = await runcloudApi('GET', `servers/${server.id}/webapps/${app.id}/domains`);
    const domains = domainsResponse.data.map(domain => domain.name);

    // Prompt the user which domain to use as key
    const {selectedDomain} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedDomain',
            message: 'Select a domain to use:',
            choices: domains,
        }
    ]);

    // List SSH private keys from the user's SSH directory
    const sshDir = path.join(process.env.HOME || process.env.USERPROFILE, '.ssh');
    const sshFiles = fs.readdirSync(sshDir).filter(file => file.endsWith('.pub') === false);

    // Prompt the user to select an SSH private key
    const {selectedSSHKey} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedSSHKey',
            message: 'Select an SSH key for the server:',
            choices: sshFiles,
        }
    ]);

    // Fetch the list of users from the server
    const usersResponse = await runcloudApi('GET', `servers/${server.id}/users`);
    const serverUser = usersResponse.data.find(user => user.id === app.server_user_id);
    const username = serverUser ? serverUser.username : null;

    // Build the config object
    const updatedConfig = {
        ...config,
        [selectedDomain]: {
            host: server.ipAddress,
            serverProjectPath: app.rootPath,
            username: username,
            branch: repo.branch,
            privateKeyPath: path.join(sshDir, selectedSSHKey),
        },
    }

    // Optionally save the updated config
    writeJsonFile(getRuncloudConfigPath(), updatedConfig);

    return updatedConfig[selectedDomain]
}

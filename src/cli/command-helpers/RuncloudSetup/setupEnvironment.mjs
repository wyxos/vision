import {getProjectPath} from "../../helpers/cliInteractions.mjs";
import path from "path";
import fs from "fs";
import {NodeSSH} from "node-ssh";
import inquirer from "inquirer";
import {runcloudApi} from "../../helpers/runcloudApi.mjs";

export default async function setupEnvironment(config, server, app, database) {
    const projectPath = getProjectPath();
    const envPath = path.join(projectPath, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');

    const ssh = new NodeSSH();

    console.log('config', config)

    await ssh.connect({
        host: config.host,
        username: config.username,
        privateKeyPath: config.privateKeyPath,
    });

    // Check if .env already exists on the server
    const {stdout: envExists} = await ssh.execCommand(`if [ -f ${config.serverProjectPath}/.env ]; then echo "yes"; else echo "no"; fi`);

    if (envExists.trim() === "yes") {
        console.log('.env file already exists on the server. Skipping setup.');
        ssh.dispose();
        return;
    }

    // Fetch database users
    const databaseUsersResponse = await runcloudApi('GET', `servers/${server.id}/databases/${database.id}/grant`);
    const databaseUsername = databaseUsersResponse.data[0]?.username; // Pick the first user from the array


    const defaults = {
        APP_ENV: 'development',
        APP_DEBUG: 'false',
        QUEUE_CONNECTION: 'redis',
        DATABASE_NAME: database.name,
        DATABASE_USERNAME: databaseUsername, // Assume this comes from your API call
    };

    // Extract MAIL_* defaults from envContent
    const mailDefaults = {};
    envContent.split('\n').forEach(line => {
        if (line.startsWith('MAIL_')) {
            const [key, value] = line.split('=');
            mailDefaults[key] = value || ''; // Set to empty if no value is found
        }
    });

    const keysToPrompt = [
        'APP_ENV', 'APP_NAME', 'APP_DEBUG', 'APP_DOMAIN', 'DATABASE_NAME', 'DATABASE_USERNAME',
        'DATABASE_PASSWORD', 'QUEUE_CONNECTION', ...Object.keys(process.env).filter(key => key.startsWith('MAIL_'))
    ];

    const prompts = keysToPrompt.map(key => ({
        type: key === 'DATABASE_PASSWORD' ? 'password' : 'input',
        name: key,
        message: `Value for ${key}:`,
        default: defaults[key] || mailDefaults[key], // Use defaults or MAIL_* defaults
    }));

    const answers = await inquirer.prompt(prompts);

    // Replace values in envContent with answers
    let updatedEnvContent = envContent;
    for (const [key, value] of Object.entries(answers)) {
        const regex = new RegExp(`${key}=.*`, 'g');
        updatedEnvContent = updatedEnvContent.replace(regex, `${key}=${value}`);
    }

    // Write the updated .env content to the server
    // Temporarily write to a local file before transferring
    const tempEnvPath = path.join(projectPath, 'temp.env');
    fs.writeFileSync(tempEnvPath, updatedEnvContent, 'utf8');

    await ssh.putFile(tempEnvPath, `${config.serverProjectPath}/.env`);

    console.log('Environment setup complete.');

    // Clean up local temp file
    fs.unlinkSync(tempEnvPath);

    ssh.dispose();
}

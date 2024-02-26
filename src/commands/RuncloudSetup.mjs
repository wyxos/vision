import Command from "../Command.mjs";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";

export default class RuncloudSetup extends Command {
    signature = "runcloud:setup";
    description = "Set up a Laravel application on Runcloud.";

    async handle() {
        // Check if the .runcloud.json file exists and read it
        const projectRootPath = process.cwd();
        const configFilePath = path.join(projectRootPath, '.runcloud.json');
        let apiKey = null;
        let apiSecret = null;

        if (fs.existsSync(configFilePath)) {
            const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
            apiKey = config.apiKey;
            apiSecret = config.apiSecret;
        }

        // Only prompt for the API key and secret if they're not already stored
        if (!apiKey || !apiSecret) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'apiKey',
                    message: 'Enter your Runcloud API Key:',
                    validate: input => !!input || 'Runcloud API Key is required.'
                },
                {
                    type: 'input',
                    name: 'apiSecret',
                    message: 'Enter your Runcloud API Secret:',
                    validate: input => !!input || 'Runcloud API Secret is required.'
                }
            ]);

            apiKey = answers.apiKey;
            apiSecret = answers.apiSecret;
            // Store the API key and secret
            await this.storeApiCredentials(apiKey, apiSecret);
            console.log('Runcloud API credentials stored successfully at the project root.');
        } else {
            console.log('Runcloud API credentials already exist.');
        }
    }

    async storeApiCredentials(apiKey, apiSecret) {
        const projectRootPath = process.cwd(); // Gets the current working directory
        const configFilePath = path.join(projectRootPath, '.runcloud.json');

        let config = {};
        if (fs.existsSync(configFilePath)) {
            // Read the existing config if the file exists
            const content = fs.readFileSync(configFilePath, 'utf8');
            config = JSON.parse(content);
        }

        // Update or set the API key and secret
        config.apiKey = apiKey;
        config.apiSecret = apiSecret;

        // Write the updated config back to the file at the project root
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
    }
}

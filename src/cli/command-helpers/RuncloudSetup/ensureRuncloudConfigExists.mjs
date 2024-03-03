import {getRuncloudConfigPath} from "../../helpers/configPaths.mjs";
import fs from "fs";
import inquirer from "inquirer";
import storeApiCredentials from "./storeApiCredentials.mjs";

export default async function ensureRuncloudConfigExists() {
    const configFilePath = getRuncloudConfigPath();
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
                type: 'password',
                name: 'apiKey',
                message: 'Enter your Runcloud API Key:',
                validate: input => !!input || 'Runcloud API Key is required.'
            },
            {
                type: 'password',
                name: 'apiSecret',
                message: 'Enter your Runcloud API Secret:',
                validate: input => !!input || 'Runcloud API Secret is required.'
            }
        ]);

        apiKey = answers.apiKey;
        apiSecret = answers.apiSecret;
        // Store the API key and secret
        await storeApiCredentials(apiKey, apiSecret);
        console.log('Runcloud API credentials stored successfully at the project root.');
    } else {
        console.log('Runcloud API credentials already exist.');
    }

    return {
        apiKey,
        apiSecret
    }
}

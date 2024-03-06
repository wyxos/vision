import {getRuncloudConfigPath} from "../../helpers/configPaths.mjs";
import fs from "fs";
import {writeJsonFile} from "../../helpers/jsonUtils.mjs";
import {appendGitIgnore} from "../../helpers/fileInteractions.mjs";

export default async function storeApiCredentials(apiKey, apiSecret) {
    const configFilePath = getRuncloudConfigPath();

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
    writeJsonFile(configFilePath, config)

    // Check if .runcloud.json is already in .gitignore
    appendGitIgnore('.runcloud.json')
}

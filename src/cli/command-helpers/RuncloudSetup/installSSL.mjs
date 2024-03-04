import {runcloudApi} from "../../helpers/runcloudApi.mjs";
import inquirer from "inquirer";

async function checkExistingSSL(serverId, webAppId) {
    try {
        const response = await runcloudApi('GET', `servers/${serverId}/webapps/${webAppId}/ssl`);
        if (response) {
            console.log('SSL already installed.');
            return true; // SSL is already installed
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('No SSL installed.');
            return false; // No SSL installed
        }
    }
}

export default async function installSSL(server, app) {
    // First, check if SSL is already installed
    const sslExists = await checkExistingSSL(server.id, app.id);
    if (sslExists) {
        console.log('Skipping SSL installation as an SSL certificate is already installed.');
        return; // Skip the rest of the function
    }

    // Fetch external APIs for dns-01 authorization
    console.log('Fetching external APIs...');
    const {data: externalApiData} = await runcloudApi('GET', 'settings/externalapi');

    const externalApis = externalApiData.map(api => ({name: api.label, value: api.id}));

    const sslDetails = await inquirer.prompt([
        {
            type: 'list',
            name: 'provider',
            message: 'Select the SSL provider:',
            choices: ['letsencrypt', 'custom', 'csr'],
        },
        {
            type: 'confirm',
            name: 'enableHttp',
            message: 'Enable HTTP?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'enableHsts',
            message: 'Enable HSTS?',
            default: true,
        },
        {
            type: 'list',
            name: 'authorizationMethod',
            message: 'Enter the authorization method for LetsEncrypt (http-01 or dns-01):',
            choices: [{label: 'http-01', value: 'http-01'}, {label: 'dns-01', value: 'dns-01'}],
            when: answers => answers.provider === 'letsencrypt',
        },
        {
            type: 'list',
            name: 'externalApi',
            choices: externalApis,
            message: 'Enter the ID of the 3rd Party API to use (for dns-01 authorization):',
            when: answers => answers.provider === 'letsencrypt' && answers.authorizationMethod === 'dns-01',
        },
        {
            type: 'list',
            name: 'environment',
            message: 'Select the environment for LetsEncrypt:',
            choices: ['live', 'staging'],
            when: answers => answers.provider === 'letsencrypt',
        },
        {
            type: 'input',
            name: 'privateKey',
            message: 'Enter the RSA Private Key:',
            when: answers => answers.provider === 'custom',
        },
        {
            type: 'input',
            name: 'certificate',
            message: 'Enter the SSL Certificate:',
            when: answers => answers.provider === 'custom',
        }
    ]);

    // Construct the POST data based on the SSL details provided
    const postData = {
        provider: sslDetails.provider,
        enableHttp: sslDetails.enableHttp,
        enableHsts: sslDetails.enableHsts,
        ...sslDetails // Spread the remaining sslDetails to include only relevant fields based on the provider
    };

    // Install the SSL
    await runcloudApi(
        'POST',
        `servers/${server.id}/webapps/${app.id}/ssl`,
        postData
    );

    console.log('SSL installed successfully.');
}

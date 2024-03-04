// Add these imports at the top of your file
import axios from 'axios';
import {readJsonFile} from "./jsonUtils.mjs";
import {getRuncloudConfigPath} from "./configPaths.mjs";

export async function fetchPhpVersions(serverId) {
    try {
        const response = await runcloudApi('GET', `servers/${serverId}/php/version`);
        return response.map(version => ({name: version, value: version}));
    } catch (error) {
        console.error('Error fetching PHP versions:', error);
        return []; // Return an empty array to avoid breaking Inquirer prompt
    }
}

export async function fetchSystemUsers(serverId) {
    try {
        const response = await runcloudApi('GET', `servers/${serverId}/users`);
        return response.data.map(user => ({name: user.username, value: user.id}));
    } catch (error) {
        console.error('Error fetching system users:', error);
        return []; // Return an empty array to avoid breaking Inquirer prompt
    }
}

// Utility function to make authenticated Runcloud API requests
export async function runcloudApi(method, endpoint, data = {}) {
    const {apiKey, apiSecret} = readJsonFile(getRuncloudConfigPath())

    const baseURL = 'https://manage.runcloud.io/api/v2';
    const url = `${baseURL}/${endpoint}`;

    try {
        const response = await axios({
            method,
            url,
            auth: {
                username: apiKey,
                password: apiSecret,
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Runcloud API request failed with status:', error.response.status);
            console.error('Status text:', error.response.statusText);
            console.error('Error details:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received for Runcloud API request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up Runcloud API request:', error.message);
        }
        throw error;
    }
}

import {runcloudApi} from "../../helpers/runcloudApi.mjs";
import inquirer from "inquirer";

export default async function setupCronAndSupervisor(config, server, app) {
    console.log('Setting up cron job...')

    // Fetch existing cron jobs
    const existingCronJobs = await runcloudApi('GET', `servers/${server.id}/cronjobs`);
    const cronJobExists = existingCronJobs.data.some(job => job.label === app.name);
    if (cronJobExists) {
        console.log(`Cron job with label "${app.name}" already exists. Skipping creation.`);
    } else {
        // Fetch server users
        const usersResponse = await runcloudApi('GET', `servers/${server.id}/users`);
        const users = usersResponse.data; // Assuming the response structure. Adjust as necessary.

        // Find the matching user by server_user_id
        const matchingUser = users.find(user => user.id === app.server_user_id);
        if (!matchingUser) {
            console.error('Matching user not found.');
            return;
        }

        // Fetch available binaries for Supervisor
        const binaries = await runcloudApi('GET', `servers/${server.id}/supervisors/binaries`);

        // Prepare choices for inquirer prompt
        const binaryChoices = binaries.map((binary, index) => ({
            label: binary, // Assuming binary is a string. Adjust if it's an object.
            value: binary,
        }));

        // Prompt user to choose a binary
        const {selectedBinary} = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedBinary',
                message: 'Choose a binary for the supervisor:',
                choices: binaryChoices,
            },
        ]);

        // Setup Cron Job with Laravel command
        const cronJobDetails = {
            label: app.name,
            username: matchingUser.username, // Replace with the actual system user
            command: `${selectedBinary} ${config.serverProjectPath}/artisan schedule:run >> ${config.serverProjectPath}/cron.log 2>&1`,
            minute: '*', // Run every minute
            hour: '*',
            dayOfMonth: '*',
            month: '*',
            dayOfWeek: '*',
        };

        await runcloudApi('POST', `servers/${server.id}/cronjobs`, cronJobDetails);
    }

    console.log('Setting up supervisor...');

    // Fetch existing supervisors
    const existingSupervisors = await runcloudApi('GET', `servers/${server.id}/supervisors`);
    const supervisorExists = existingSupervisors.data.some(supervisor => supervisor.label === app.name);
    if (supervisorExists) {
        console.log(`Supervisor with label "${app.name}" already exists. Skipping creation.`);
    } else {
        // Fetch server users
        const usersResponse = await runcloudApi('GET', `servers/${server.id}/users`);
        const users = usersResponse.data; // Assuming the response structure. Adjust as necessary.

        // Find the matching user by server_user_id
        const matchingUser = users.find(user => user.id === app.server_user_id);
        if (!matchingUser) {
            console.error('Matching user not found.');
            return;
        }

        // Fetch available binaries for Supervisor
        const binaries = await runcloudApi('GET', `servers/${server.id}/supervisors/binaries`);

        // Prepare choices for inquirer prompt
        const binaryChoices = binaries.map((binary, index) => ({
            label: binary, // Assuming binary is a string. Adjust if it's an object.
            value: binary,
        }));

        // Prompt user to choose a binary
        const {selectedBinary} = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedBinary',
                message: 'Choose a binary for the supervisor:',
                choices: binaryChoices,
            },
        ]);

        // Setup Supervisor with user's binary choice
        const supervisorDetails = {
            label: app.name,
            username: matchingUser.username, // Use the username from the matched user
            autoRestart: true,
            autoStart: true,
            binary: selectedBinary, // Use the binary selected by the user
            directory: config.serverProjectPath, // Set the working directory to the project path
            command: `${config.serverProjectPath}/artisan horizon`, // Adjust /path/to/artisan
            // accordingly
            numprocs: 1,
        };

        // Assume runcloudApi function handles binary choice appropriately
        await runcloudApi('POST', `servers/${server.id}/supervisors`, supervisorDetails);

        console.log('Supervisor job setup successfully.');
    }
}

import {runcloudApi} from "../../helpers/runcloudApi.mjs";
import inquirer from "inquirer";

export default async function createDatabase(server, app) {
    let databaseName = app.name.replace(/-/g, '_');
    if (databaseName.length < 5) {
        databaseName = 'database_' + databaseName;
    }
    let database = null;

    // Check if the database exists
    const databasesResponse = await runcloudApi('GET', `servers/${server.id}/databases`);
    const existingDatabase = databasesResponse.data.find(db => db.name === databaseName);

    if (existingDatabase) {
        console.log(`Database ${databaseName} already exists.`);
        database = existingDatabase;

        // Check if the database already has users assigned
        const databaseUsersResponse = await runcloudApi('GET', `servers/${server.id}/databases/${existingDatabase.id}/grant`);
        if (databaseUsersResponse.data.length > 0) {
            console.log(`Database ${databaseName} already has users assigned.`);
            return existingDatabase; // Skip user assignment if users are already linked
        }
    } else {
        // Create the database
        const createDbResponse = await runcloudApi('POST', `servers/${server.id}/databases`, {
            name: databaseName,
            collation: 'utf8mb4_unicode_ci'
        });

        console.log(`Database ${databaseName} created successfully.`);
        database = createDbResponse;
    }

    // Fetch existing database users
    const usersResponse = await runcloudApi('GET', `servers/${server.id}/databaseusers`);
    const users = usersResponse.data.map(user => ({name: user.username, value: user.id}));

    // Ask user to create a new user or use an existing one
    const {action} = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Would you like to create a new user or use an existing one?',
        choices: [
            {name: 'Create a new user', value: 'create'},
            {name: 'Use an existing user', value: 'useExisting'},
        ],
    }]);

    let userId;

    if (action === 'create') {
        // Prompt for new user details
        const userDetails = await inquirer.prompt([
            {type: 'input', name: 'username', message: 'Enter username for the new database user:'},
            {type: 'password', name: 'password', message: 'Enter password for the new database user:'},
        ]);

        const createUserResponse = await runcloudApi('POST', `servers/${server.id}/databaseusers`, userDetails);

        if (!createUserResponse.success) {
            console.error('Failed to create database user.');
            return;
        }

        console.log(`Database user ${userDetails.username} created successfully.`);
        userId = createUserResponse.data.id;
    } else {
        // Prompt to select an existing user
        const {selectedUser} = await inquirer.prompt([{
            type: 'list',
            name: 'selectedUser',
            message: 'Select a user to link to the database:',
            choices: users,
        }]);

        userId = selectedUser;
    }

    // Link user to the database
    const grantResponse = await runcloudApi('POST', `servers/${server.id}/databases/${database.id}/grant`, {
        id: userId,
    });

    console.log('User assigned to the database successfully.');

    return database
}

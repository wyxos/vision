import {fetchPhpVersions, fetchSystemUsers, runcloudApi} from "../../helpers/runcloudApi.mjs";
import inquirer from "inquirer";
import {getProjectName} from "../../helpers/cliInteractions.mjs";

export default async function createWebApp(server) {
    // After obtaining the server ID...
    const phpVersions = await fetchPhpVersions(server.id);
    const systemUsers = await fetchSystemUsers(server.id);

    console.log('system users', systemUsers)

    let webAppDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the Web Application:',
            validate: input => !!input || 'Name is required.',
            default: getProjectName()
        },
    ]);

    // Check if the web app already exists
    const existingApps = await runcloudApi('GET', `servers/${server.id}/webapps`);
    const appExists = existingApps.data.some(app => app.name === webAppDetails.name);

    if (appExists) {
        const proceedWithExistingApp = await inquirer.prompt({
            type: 'confirm',
            name: 'proceed',
            message: 'A Web Application with this name already exists. Do you want to proceed with the existing one?',
            default: false
        });

        if (!proceedWithExistingApp.proceed) {
            console.log('Operation cancelled by the user.');
            return;
        } else {
            // If proceeding with existing app, return its instance
            const existingApp = existingApps.data.find(app => app.name === webAppDetails.name);
            console.log(`Proceeding with existing Web Application: ${existingApp.name}`);
            return existingApp;
        }
    }

    webAppDetails = {
        ...webAppDetails,
        ...await inquirer.prompt([
            {
                type: 'input',
                name: 'domainName',
                message: 'Enter the domain name for the Web Application:',
                validate: input => !!input || 'Domain name is required.'
            },
            {
                type: 'list',
                name: 'user',
                message: 'Select the System User:',
                choices: systemUsers
            },
            {
                type: 'input',
                name: 'publicPath',
                message: 'Enter the public path (leave blank to use root):',
                default: null
            },
            {type: 'list', name: 'phpVersion', message: 'Select PHP version:', choices: phpVersions},
            {type: 'input', name: 'timezone', message: 'Enter the timezone:', default: 'Europe/London'},
        ])
    }

    console.log('app details', webAppDetails)

// Default values for other required fields
    const defaultWebAppDetails = {
        stack: 'nativenginx',
        stackMode: 'production',
        clickjackingProtection: true,
        xssProtection: true,
        mimeSniffingProtection: true,
        processManager: 'ondemand',
        processManagerMaxChildren: 50,
        processManagerMaxRequests: 500,
        openBasedir: `/home/${systemUsers.find(user => user.value === webAppDetails.user).name}/webapps/${webAppDetails.name}:/var/lib/php/session:/tmp`,
        disableFunctions: "getmyuid,passthru,leak,listen,diskfreespace,tmpfile,link,ignore_user_abort,shell_exec,dl,set_time_limit,exec,system,highlight_file,source,show_source,fpassthru,virtual,posix_ctermid,posix_getcwd,posix_getegid,posix_geteuid,posix_getgid,posix_getgrgid,posix_getgrnam,posix_getgroups,posix_getlogin,posix_getpgid,posix_getpgrp,posix_getpid,posix,_getppid,posix_getpwuid,posix_getrlimit,posix_getsid,posix_getuid,posix_isatty,posix_kill,posix_mkfifo,posix_setegid,posix_seteuid,posix_setgid,posix_setpgid,posix_setsid,posix_setuid,posix_times,posix_ttyname,posix_uname,proc_open,proc_close,proc_nice,proc_terminate,escapeshellcmd,ini_alter,popen,pcntl_exec,socket_accept,socket_bind,socket_clear_error,socket_close,socket_connect,symlink,posix_geteuid,ini_alter,socket_listen,socket_create_listen,socket_read,socket_create_pair,stream_socket_server",
        maxExecutionTime: 30,
        maxInputTime: 60,
        maxInputVars: 1000,
        memoryLimit: 256,
        postMaxSize: 256,
        uploadMaxFilesize: 256,
        sessionGcMaxlifetime: 1440,
        allowUrlFopen: true,
    };

// Combine user input with default values
    const combinedWebAppDetails = {...webAppDetails, ...defaultWebAppDetails};

// Proceed to create the web app...
    const createWebAppResponse = await runcloudApi(
        'POST',
        `servers/${server.id}/webapps/custom`,
        combinedWebAppDetails
    );

    if (createWebAppResponse && createWebAppResponse.id) {
        console.log(`Web application created successfully with ID: ${createWebAppResponse.id}`);

        return createWebAppResponse
    } else {
        console.error('Failed to create web application.');
    }
}

import Command from "../Command.mjs";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import {runcloudApi, fetchPhpVersions, fetchSystemUsers} from "../helpers/runcloudApi.mjs";
import {getProjectName, getProjectPath} from "../helpers/cliInteractions.mjs";
import {getRuncloudConfigPath} from "../helpers/configPaths.mjs";
import {readJsonFile, writeJsonFile} from "../helpers/jsonUtils.mjs";
import {appendGitIgnore} from "../helpers/fileInteractions.mjs";
import {NodeSSH} from "node-ssh";
import publishApp from "../RuncloudSetup/publishApp.mjs";
import ensureConfigExists from "../RuncloudSetup/ensureConfigExists.mjs";
import createWebApp from "../RuncloudSetup/createApp.mjs";
import selectServer from "../RuncloudSetup/selectServer.mjs";
import updateConfig from "../RuncloudSetup/updateConfig.mjs";
import createDatabase from "../RuncloudSetup/createDatabase.mjs";
import setupCronAndSupervisor from "../RuncloudSetup/setupCronAndSupervisor.mjs";
import installSSL from "../RuncloudSetup/installSSL.mjs";
import setupEnvironment from "../RuncloudSetup/setupEnvironment.mjs";
import installDependencies from "../RuncloudSetup/installDependencies.mjs";
import linkRepository from "../RuncloudSetup/linkRepository.mjs";


export default class RuncloudSetup extends Command {
    signature = "runcloud:setup";
    description = "Set up a Laravel application on Runcloud.";

    async handle() {
        try {
            await ensureConfigExists()

            await this.testRuncloudApi()

            const server = await selectServer()

            console.log('server', server)

            const app = await createWebApp(server)

            const repo = await linkRepository(server.id, app.id)

            await installSSL(server, app)

            const database = await createDatabase(server, app)

            const config = await updateConfig(server, app, repo)

            await setupEnvironment(config, server, app, database)

            await installDependencies(config)

            await setupCronAndSupervisor(config, server, app)

            await publishApp(config)

            // open url in browser and exit
        } catch (error) {
            throw error
        }
    }


    async testRuncloudApi() {
        // Test the connection to Runcloud
        console.log('Testing connection to Runcloud...');
        const pingResponse = await runcloudApi('GET', 'ping');
        if (pingResponse.message === 'pong') {
            console.log('Connected to Runcloud successfully.');
        } else {
            console.error('Failed to connect to Runcloud.');
            process.exit(1);
        }
    }


}

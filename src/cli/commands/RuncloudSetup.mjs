import Command from "../Command.mjs";
import {runcloudApi} from "../helpers/runcloudApi.mjs";
import publishApp from "../command-helpers/RuncloudSetup/publishApp.mjs";
import ensureRuncloudConfigExists from "../command-helpers/RuncloudSetup/ensureRuncloudConfigExists.mjs";
import createWebApp from "../command-helpers/RuncloudSetup/createApp.mjs";
import selectServer from "../command-helpers/RuncloudSetup/selectServer.mjs";
import updateConfig from "../command-helpers/RuncloudSetup/updateConfig.mjs";
import createDatabase from "../command-helpers/RuncloudSetup/createDatabase.mjs";
import setupCronAndSupervisor from "../command-helpers/RuncloudSetup/setupCronAndSupervisor.mjs";
import installSSL from "../command-helpers/RuncloudSetup/installSSL.mjs";
import setupEnvironment from "../command-helpers/RuncloudSetup/setupEnvironment.mjs";
import installDependencies from "../command-helpers/RuncloudSetup/installDependencies.mjs";
import linkRepository from "../command-helpers/RuncloudSetup/linkRepository.mjs";


export default class RuncloudSetup extends Command {
    signature = "runcloud:setup";
    description = "Set up a Laravel application on Runcloud.";

    async handle() {
        try {
            await ensureRuncloudConfigExists()

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

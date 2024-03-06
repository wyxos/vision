import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {execSync} from 'child_process'
import Command from "../Command.mjs"
import MakeLaravel from "./MakeLaravel.mjs";
import ensureVisionConfigExists from "../command-helpers/MakeLaravel/ensureVisionConfigExists.mjs";

export default class ToggleHarmonie extends Command {
    signature = "toggle:harmonie"
    description = "Toggle wyxos/harmonie vendor between local and online versions"

    async handle() {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        const composerPath = path.join(process.cwd(), 'composer.json')

        if (!fs.existsSync(composerPath)) {
            console.log("composer.json not found")
            process.exit(1)
        }

        const composerJSON = JSON.parse(fs.readFileSync(composerPath, 'utf8'))
        const packageName = 'wyxos/harmonie'
        const localPaths = [
            '../../../wyxos/php/harmonie',
            '../../harmonie'
        ]

        // Removed SSH connection setup, replaced with homesteadConfig setup
        const {homesteadDir} = await ensureVisionConfigExists('homestead')

        try {
            // Construct the command to run via vagrant ssh
            const composerCommand = `composer show ${packageName} --latest`
            const vagrantCommand = `cd ${cwd} && ${composerCommand}`
            const execOptions = {cwd: homesteadDir}

            if (composerJSON.repositories && composerJSON.repositories.some(repo => repo.type === 'path' && localPaths.includes(repo.url))) {
                // Use execSync to execute the command via vagrant ssh
                const result = execSync(`vagrant ssh -c "${vagrantCommand}"`, execOptions).toString()

                const latestVersion = result.split('\n')
                    .find(line => line.includes('versions'))
                    .split(':')
                    .pop()
                    .trim()
                    .match(/\d+\.\d+/)[0]

                composerJSON.require[packageName] = `^${latestVersion}`
                composerJSON.repositories = composerJSON.repositories.filter(repo => repo.type !== 'path' || !localPaths.includes(repo.url))
                fs.writeFileSync(composerPath, JSON.stringify(composerJSON, null, 2))
                console.log(`Toggled ${packageName}`)

                execSync(`vagrant ssh -c "cd ${cwd} && composer update"`, execOptions)
            } else {
                // Switch to local version
                if (!composerJSON.repositories) {
                    composerJSON.repositories = [];
                }

                // Determine the existing local path that is accessible
                const existingPath = localPaths.find(p => fs.existsSync(path.join(__dirname, p))) || localPaths[0];
                // Add the repository configuration for the local package
                composerJSON.repositories.push({
                    "type": "path",
                    "url": existingPath,
                    "options": {"symlink": true}
                });

                // Set the package version to use the local version
                composerJSON.require[packageName] = 'dev-main';
                // Write the updated composer.json file
                fs.writeFileSync(composerPath, JSON.stringify(composerJSON, null, 2));

                console.log(`Switched ${packageName} to local version`);

                // Run composer update to apply the changes
                const updateCommand = `cd ${cwd} && composer update ${packageName}`;
                // Execute the update command via vagrant ssh
                execSync(`vagrant ssh -c "${updateCommand}"`, {cwd: homesteadDir});
            }
        } catch (error) {
            console.error('Failed:', error.message)
        }
    }
}

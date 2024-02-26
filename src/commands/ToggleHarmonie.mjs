import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {execSync} from 'child_process'
import Command from "../Command.mjs"

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
        const {cwd} = await getHomesteadConfig()
        const homesteadDir = path.dirname(cwd) // Assuming cwd includes the project path within Homestead

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
                // Your logic to switch to the local version goes here, similar to above
                // Remember to use execSync for command execution
            }
        } catch (error) {
            console.error('Failed:', error.message)
        }
    }
}

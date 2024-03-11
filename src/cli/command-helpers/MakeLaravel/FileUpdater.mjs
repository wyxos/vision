import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import {getProjectPathOnWindows} from "../../helpers/cliInteractions.mjs";
import {execSync} from "child_process";
import {appendToFile} from "../../helpers/fileInteractions.mjs";

class FileUpdater {
    updateWindowsHostsFile(command) {
        if (command.isValet()) {
            const distroIP = command.config.wslDistroIp
            console.log("RESULT", distroIP);

            const hostEntry = `${distroIP} ${command.projectName}.test`;
            const hostsFilePath = path.join('C:\\', 'Windows', 'System32', 'drivers', 'etc', 'hosts');

            // Read the current hosts file content
            const currentHostsContent = fs.readFileSync(hostsFilePath, 'utf-8');

            // Check if the entry already exists
            if (!currentHostsContent.includes(`${command.projectName}.test`)) {
                // Append to file on a new line
                appendToFile(hostsFilePath, `\n${hostEntry}`);
                console.log(`${command.projectName}.test has been added to your hosts file, pointing to ${distroIP}`);
            } else {
                console.log(`${command.projectName}.test is already in your hosts file.`);
            }
        } else {
            const {homesteadDir} = command.config
            console.log('Updating Windows hosts file...');
            // Define the path to the Homestead.yaml file
            const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');

            // Read the Homestead.yaml content
            const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
            const homesteadConfig = yaml.load(yamlContent);

            // Extract the IP address from the Homestead configuration
            const ipAddress = homesteadConfig.ip;

            // Define the hosts file path and the entry to append
            const hostsPath = 'C:/Windows/System32/drivers/etc/hosts';
            const entry = `${ipAddress} ${command.projectName}.test`;

            // Read the current content of the hosts file
            const hostsContent = fs.readFileSync(hostsPath, 'utf8');

            // Check if the entry already exists in the hosts file
            if (!hostsContent.includes(entry)) {
                // Append the new entry to the hosts file
                fs.appendFileSync(hostsPath, `\n${entry}`);
                console.log(`Windows hosts file updated with ${command.projectName}.test`);
            } else {
                console.log(`The host entry for ${command.projectName}.test already exists. No update needed.`);
            }
        }
    }

    updateHomesteadYaml(command) {
        const {homesteadDir, projectMapping, projectSubPath} = command.config
        console.log('Updating Homestead.yaml...');
        const homesteadPath = path.join(homesteadDir, 'Homestead.yaml');
        const yamlContent = fs.readFileSync(homesteadPath, 'utf8');
        let homesteadConfig = yaml.load(yamlContent);

        // Construct the correct 'to' path by incorporating the projectMapping and projectSubPath
        const fullPathTo = path.join(projectMapping.to, projectSubPath, command.projectName, "public").replace(/\\/g, '/');

        // Check if the site already exists
        const siteExists = homesteadConfig.sites.some(site => site.map === `${command.projectName}.test`);
        if (!siteExists) {
            homesteadConfig.sites.push({
                map: `${command.projectName}.test`,
                to: fullPathTo
            });
        } else {
            console.log(`Site entry for ${command.projectName}.test already exists.`);
        }

        // Check if the database already exists
        const dbExists = homesteadConfig.databases.includes(command.projectName);
        if (!dbExists) {
            homesteadConfig.databases.push(command.projectName);
        } else {
            console.log(`Database entry for ${command.projectName} already exists.`);
        }

        // Only write back to Homestead.yaml if changes were made
        if (!siteExists || !dbExists) {
            const newYamlContent = yaml.dump(homesteadConfig);
            fs.writeFileSync(homesteadPath, newYamlContent);
            console.log('Homestead.yaml updated successfully.');
        } else {
            console.log('No updates made to Homestead.yaml.');
        }
    }

    updateEnvFile(command) {
        const projectPath = getProjectPathOnWindows(command.config, command.projectName);
        const envFilePath = path.join(projectPath, '.env');
        const envContents = fs.readFileSync(envFilePath, 'utf-8');
        const lines = envContents.split(/\r?\n/);

        // Extract the domain from APP_URL
        const appUrlMatch = envContents.match(/^APP_URL=(https?:\/\/)?(.+)$/m);
        const appDomain = appUrlMatch ? appUrlMatch[2] : 'example.test';

        const updatedLines = lines.map(line => {
            if (line.startsWith('APP_URL=')) {
                return `APP_URL=https://\${appDomain}`;
            } else if (line.startsWith('DB_USERNAME=')) {
                return 'DB_USERNAME=homestead';
            } else if (line.startsWith('DB_PASSWORD=')) {
                return 'DB_PASSWORD=secret';
            } else if (line.startsWith('MAIL_FROM_ADDRESS=')) {
                return `MAIL_FROM_ADDRESS=hello@$\${appDomain}`;
            } else {
                return line;
            }
        });

        // Add new entries
        updatedLines.push(`APP_DOMAIN=${appDomain}`);
        updatedLines.push(`SANCTUM_STATEFUL_DOMAINS=\${appDomain}`);
        updatedLines.push(`SESSION_DOMAIN=.\${appDomain}`);
        updatedLines.push(`SESSION_SECURE_COOKIE=true`);

        // Write the updated content back to the .env file
        fs.writeFileSync(envFilePath, updatedLines.join('\n'));
    }
}

export default new FileUpdater()

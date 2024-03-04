import {NodeSSH} from "node-ssh";

export default async function installDependencies(config) {
    const ssh = new NodeSSH();

    await ssh.connect({
        host: config.host,
        username: config.username,
        privateKeyPath: config.privateKeyPath,
    });

    // Navigate to the server project path
    const serverProjectPath = config.serverProjectPath;

    // Check if 'composer.lock' exists
    const {stdout: composerLockExists} = await ssh.execCommand('if [ -f composer.lock ]; then echo "yes"; else echo "no"; fi', {cwd: serverProjectPath});
    if (composerLockExists.trim() === "no") {
        console.log('Running composer install...');
        const composerResult = await ssh.execCommand('composer install', {cwd: serverProjectPath});
        if (composerResult.stdout) console.log('Composer stdout:', composerResult.stdout);
        if (composerResult.stderr) console.error('Composer stderr:', composerResult.stderr);
    } else {
        console.log('composer.lock found. Skipping composer install.');
    }

    // Check if 'package-lock.json' exists
    const {stdout: packageLockExists} = await ssh.execCommand('if [ -f package-lock.json ]; then echo "yes"; else echo "no"; fi', {cwd: serverProjectPath});
    if (packageLockExists.trim() === "no") {
        console.log('Running npm install...');
        const npmResult = await ssh.execCommand('npm install', {cwd: serverProjectPath});
        if (npmResult.stdout) console.log('NPM stdout:', npmResult.stdout);
        if (npmResult.stderr) console.error('NPM stderr:', npmResult.stderr);
    } else {
        console.log('package-lock.json found. Skipping npm install.');
    }

    console.log('Dependencies installed successfully.');

    ssh.dispose()
}

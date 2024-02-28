import {NodeSSH} from "node-ssh";

export default async function publishApp(config) {
    const ssh = new NodeSSH();

    await ssh.connect({
        host: config.host,
        username: config.username,
        privateKeyPath: config.privateKeyPath,
    });

    // Navigate to the server project path
    const serverProjectPath = config.serverProjectPath;

    // Run 'npm run build'
    console.log('Running npm run build...');
    const buildResult = await ssh.execCommand('npm run build', {cwd: serverProjectPath});
    if (buildResult.stdout) console.log('Build stdout:', buildResult.stdout);
    if (buildResult.stderr) console.error('Build stderr:', buildResult.stderr);

    // Run 'php artisan migrate'
    console.log('Running migrations...');
    const migrateResult = await ssh.execCommand('php artisan migrate', {cwd: serverProjectPath});
    if (migrateResult.stdout) console.log('Migrate stdout:', migrateResult.stdout);
    if (migrateResult.stderr) console.error('Migrate stderr:', migrateResult.stderr);

    console.log('Application published successfully.');

    ssh.dispose()
}

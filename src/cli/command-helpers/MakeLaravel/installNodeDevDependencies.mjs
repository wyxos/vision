import path from "path";
import {execSyncSilent, git} from "../../helpers/cliInteractions.mjs";
import {getVisionConfig} from "../../helpers/configPaths.mjs";

export default async function installNodeDevDependencies(projectName) {
    const config = getVisionConfig()
    console.log('Installing node dependencies...')
    const projectPathOnWindows = path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/');

    const devDependencies = [
        'laravel-vite-plugin',
        'vite-plugin-mkcert',
        '@vitejs/plugin-vue',
        'vue vue-router',
        '@oruga-ui/oruga-next',
        '@tailwindcss/forms',
        '@tailwindcss/typography',
        'vue-inline-svg',
        '@tailwindcss/nesting',
        'postcss-import',
        '@wyxos/vision',
        'eslint',
        'eslint-config-prettier',
        'eslint-config-standard',
        'eslint-plugin-import',
        'eslint-plugin-json',
        'eslint-plugin-n',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-vue',
        'prettier',
        '@prettier/plugin-php',
        'vite-plugin-eslint',
    ];

    execSyncSilent(`npm install -D ${devDependencies.join(' ')}`, {
        cwd: projectPathOnWindows // Ensure this is the path to the project root in Windows
    });

    git('add .', projectPathOnWindows);

    git('commit -m "chore: node dependencies"', projectPathOnWindows);

    console.log('Node dependencies installed successfully.');
}

import {
    artisan,
    composer,
    getHomesteadProjectPath,
    getProjectPathOnWindows,
    git
} from "../../helpers/cliInteractions.mjs";


class ProjectDependencies {
    installNodeDependencies(command) {
        console.log('Installing node dependencies...')
        const projectPathOnWindows = getProjectPathOnWindows(command.config, command.projectName);

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

    installComposerDependencies(command) {
        console.log('Installing php dependencies...');

        const projectPathOnWindows = getProjectPathOnWindows(command.config, command.projectName);

        const homesteadProjectPath = getHomesteadProjectPath(command.projectName);

        composer(homesteadProjectPath, 'require wyxos/harmonie');

        composer(homesteadProjectPath, 'require laravel/breeze --dev');

        artisan(homesteadProjectPath, 'breeze:install blade --no-interaction');

        composer(homesteadProjectPath, 'require laravel/horizon')

        artisan(homesteadProjectPath, 'horizon:install');

        composer(homesteadProjectPath, 'require laravel/scout')

        artisan(homesteadProjectPath, 'vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"')

        composer(homesteadProjectPath, 'require spatie/laravel-permission')

        artisan(homesteadProjectPath, 'vendor:publish  --provider="Spatie\\Permission\\PermissionServiceProvider"')

        composer(homesteadProjectPath, 'require spatie/laravel-tags')

        artisan(homesteadProjectPath, 'vendor:publish --provider="Spatie\\Tags\\TagsServiceProvider"' +
            ' --tag="tags-migrations"')

        composer(homesteadProjectPath, 'require barryvdh/laravel-debugbar --dev')

        git('add .', projectPathOnWindows);

        git('commit -m "chore: php dependencies"', projectPathOnWindows);
    }
}

export default new ProjectDependencies()

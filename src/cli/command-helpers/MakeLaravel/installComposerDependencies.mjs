import path from "path";
import {readJsonFile} from "../../helpers/jsonUtils.mjs";
import {getVisionConfigPath} from "../../helpers/configPaths.mjs";
import {artisan, composer, getHomesteadProjectPath, git} from "../../helpers/cliInteractions.mjs";

export default async function installComposerDependencies(projectName) {
    const config = readJsonFile(getVisionConfigPath())

    console.log('Installing php dependencies...');
    const projectPathOnWindows = path.join(config.projectMapping.map, config.projectSubPath, projectName).replace(/\\/g, '/');

    const homesteadProjectPath = getHomesteadProjectPath(projectName);

    composer(homesteadProjectPath, 'require wyxos/harmonie');

    composer(homesteadProjectPath, 'require laravel/breeze --dev');

    artisan(homesteadProjectPath, 'breeze:install blade --no-interaction');

    composer(homesteadProjectPath, 'require laravel/horizon')

    artisan(homesteadProjectPath, 'horizon:install');

    composer(homesteadProjectPath, 'require laravel/scout')

    artisan(homesteadProjectPath, 'vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"')

    composer(homesteadProjectPath, 'require spatie/laravel-permission')

    artisan(homesteadProjectPath, 'vendor:publish' +
        ' --provider="Spatie\\Permission\\PermissionServiceProvider"')

    composer(homesteadProjectPath, 'require spatie/laravel-tags')

    artisan(homesteadProjectPath, 'vendor:publish --provider="Spatie\\Tags\\TagsServiceProvider"' +
        ' --tag="tags-migrations"')

    composer(homesteadProjectPath, 'require barryvdh/laravel-debugbar --dev')

    git('add .', projectPathOnWindows);

    git('commit -m "chore: php dependencies"', projectPathOnWindows);
}

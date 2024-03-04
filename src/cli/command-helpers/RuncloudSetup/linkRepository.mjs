import path from "path";
import {getProjectPath} from "../../helpers/cliInteractions.mjs";
import fs from "fs";
import inquirer from "inquirer";
import {runcloudApi} from "../../helpers/runcloudApi.mjs";

function formatRepoUrl(repoUrl) {
    // SSH format: git@HOST:USERNAME/REPO.git
    // HTTPS format: https://HOST/USERNAME/REPO.git
    const sshPattern = /git@[^:]+:([^\/]+)\/(.+)\.git/;
    const httpsPattern = /https:\/\/[^\/]+\/([^\/]+)\/(.+)\.git/;
    let match = repoUrl.match(sshPattern) || repoUrl.match(httpsPattern);

    if (match && match.length === 3) {
        // Format: USERNAME/REPOSITORY
        return `${match[1]}/${match[2]}`;
    }

    // Return unchanged if no match (as a fallback)
    return repoUrl;
}


export default async function linkRepository(serverId, webAppId) {
    // First, check if a repository is already linked
    try {
        const existingRepo = await runcloudApi(
            'GET',
            `servers/${serverId}/webapps/${webAppId}/git`
        );

        if (existingRepo) {
            return existingRepo; // Return existing linked repo details
        }
    } catch (error) {
        console.error('Error when checking for repo, likely it does not exist yet.')
    }


    const gitConfigPath = path.join(getProjectPath(), '.git', 'config');
    let repoProvider = 'custom';
    let repoUrl = '';

    if (fs.existsSync(gitConfigPath)) {
        const gitConfigContent = fs.readFileSync(gitConfigPath, 'utf8');
        if (gitConfigContent.includes('github.com')) {
            repoProvider = 'github';
        } else if (gitConfigContent.includes('bitbucket.org')) {
            repoProvider = 'bitbucket';
        } else if (gitConfigContent.includes('gitlab.com')) {
            repoProvider = 'gitlab';
        }

        const match = gitConfigContent.match(/url = (.+)/);
        if (match) {
            repoUrl = match[1].trim();
            repoUrl = formatRepoUrl(repoUrl); // Format the URL for display
        }
    }

    // Throw an error if no remote repository is defined
    if (!repoUrl) {
        throw new Error('No remote repository defined. Please ensure your project has a remote repository.');
    }

    const repoDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'repository',
            message: 'Enter your repository in the format <username>/<repository>:',
            default: repoUrl, // Prepopulate with detected URL if available
            validate: input => !!input || 'Repository is required.'
        },
        {
            type: 'input',
            name: 'branch',
            message: 'Enter the repository branch to clone:',
            default: 'master', // Default to master/main as a sensible default
            validate: input => !!input || 'Branch is required.'
        }
    ]);

    // Construct the POST data based on provider
    const postData = {
        provider: repoProvider,
        repository: repoDetails.repository,
        branch: repoDetails.branch
    };

    // If provider is 'custom' or 'selfhostedgitlab', prompt for gitUser and gitHost
    if (['custom', 'selfhostedgitlab'].includes(repoProvider)) {
        const customProviderDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'gitUser',
                message: 'Enter the username of git server user:',
                validate: input => !!input || 'Git user is required for custom/self-hosted GitLab repositories.'
            },
            {
                type: 'input',
                name: 'gitHost',
                message: 'Enter the hostname of your GIT server:',
                validate: input => !!input || 'Git host is required for custom/self-hosted GitLab repositories.'
            }
        ]);

        Object.assign(postData, customProviderDetails);
    }

    // Link the repository
    const response = await runcloudApi(
        'POST',
        `servers/${serverId}/webapps/${webAppId}/git`,
        postData
    );

    console.log('Repository linked successfully to the web app.');

    return response
}

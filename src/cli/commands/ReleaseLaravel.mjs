import Command from '../Command.mjs'

import simpleGit from 'simple-git'
import inquirer from 'inquirer'

const git = simpleGit()

const checkForUncommittedFiles = async () => {
  const status = await git.status()
  const { not_added: untrackedFiles, modified: modifiedFiles } = status

  if (untrackedFiles.length > 0 || modifiedFiles.length > 0) {
    console.log('Untracked or modified files:');
    [...untrackedFiles, ...modifiedFiles].forEach(file => console.log(file))

    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'commitMessage',
      message: 'Enter a commit message:'
    }])

    await git.add('.').commit(answers.commitMessage)
    console.log('Files committed.')
  } else {
    console.log('No untracked or modified files.')
  }
}

import fs from 'fs'
import os from 'os'
import path from 'path'

let selectedServerConfig

const getBranchChoices = async () => {
  const branchSummary = await git.branchLocal()
  return branchSummary.all.map(branch => ({ name: branch, value: branch }))
}

const createRuncloudConfig = async () => {
  let runcloudConfig = { servers: [] }
  const runcloudConfigPath = './runcloud.json'
  const gitignorePath = './.gitignore'

  // Load existing runcloud.json if it exists
  if (fs.existsSync(runcloudConfigPath)) {
    try {
      const configContent = fs.readFileSync(runcloudConfigPath, 'utf8')
      runcloudConfig = JSON.parse(configContent)
    } catch (error) {
      console.error('Error reading runcloud.json:', error)
      process.exit(1)
    }
  }

  const branches = await getBranchChoices()

  const serverConfigQuestions = [
    { type: 'input', name: 'ip', message: 'Server IP:' },
    {
      type: 'list',
      name: 'branch',
      message: 'Branch mapped with the project:',
      choices: branches
    },
    {
      type: 'input',
      name: 'path',
      message: 'Path of the project on the server:',
      defaultValue: '/home/runcloud/webapps/projectname'
    },
    { type: 'input', name: 'username', message: 'Username to login with:' },
    {
      type: 'list',
      name: 'sshKeyPath',
      message: 'Select the SSH key to use:',
      choices: fs.readdirSync(path.join(os.homedir(), '.ssh')).map(file => ({
        name: file,
        value: path.join(os.homedir(), '.ssh', file)
      }))
    }
  ]

  const addMoreQuestion = [
    { type: 'confirm', name: 'addMore', message: 'Do you want to add more servers?' }
  ]

  const addOrUpdateServer = async () => {
    const answers = await inquirer.prompt(serverConfigQuestions)
    runcloudConfig.servers.push(answers)

    const addMore = await inquirer.prompt(addMoreQuestion)
    if (addMore.addMore) {
      await addOrUpdateServer()
    }
  }

  if (runcloudConfig.servers.length > 0) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        { name: 'Select from existing configs', value: 'select' },
        { name: 'Add a new server config', value: 'new' }
      ]
    })

    if (action === 'new') {
      await addOrUpdateServer()
    }

    const { selectedServer } = await inquirer.prompt({
      type: 'list',
      name: 'selectedServer',
      message: 'Select a server configuration:',
      choices: runcloudConfig.servers.map((server, index) => ({
        name: `${server.username}@${server.ip} - ${server.branch}`,
        value: index
      }))
    })

    selectedServerConfig = runcloudConfig.servers[selectedServer]
  } else {
    await addOrUpdateServer()
  }

  try {
    fs.writeFileSync(runcloudConfigPath, JSON.stringify(runcloudConfig, null, 2), 'utf8')
    // Check and update .gitignore after confirming runcloud.json is properly saved
    updateGitignore(gitignorePath)
  } catch (error) {
    console.error('Error saving runcloud.json:', error)
    process.exit(1)
  }
}

const updateGitignore = async (gitignorePath) => {
  let gitignoreContent = ''
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
  }
  if (!gitignoreContent.includes('runcloud.json')) {
    gitignoreContent += '\nruncloud.json\n'
    fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8')
    await git.add('.gitignore').commit('chore: release setup')
  }
}

const processDifferences = (differences) => {
  const lines = differences.split('\n')
  const changeFlags = {
    databaseChanges: false,
    composerChanges: false,
    nodeChanges: false,
    assetChanges: false,
    phpChanges: false
  }

  lines.forEach(line => {
    if (line.startsWith('D')) return // Exclude deleted files from checks

    // console.log(line) // Log each change

    if (!changeFlags.databaseChanges && line.match(/migrations\/.*\.php$/i)) {
      changeFlags.databaseChanges = true
    }
    if (!changeFlags.composerChanges && line.match(/composer\.lock$/i)) {
      changeFlags.composerChanges = true
    }
    if (!changeFlags.nodeChanges && line.match(/package\.json$/i)) {
      changeFlags.nodeChanges = true
    }
    if (!changeFlags.assetChanges && (line.match(/\.(vue|js|css)$/i) || line.match(/package\.json$/i))) {
      changeFlags.assetChanges = true
    }
    if (!changeFlags.phpChanges && line.match(/\.php$/i)) {
      changeFlags.phpChanges = true
    }
  })

  // Log whether changes were found or not
  console.log('Detected changes:')
  console.log(`- Database changes: ${changeFlags.databaseChanges ? 'Yes' : 'No'}`)
  console.log(`- Composer changes: ${changeFlags.composerChanges ? 'Yes' : 'No'}`)
  console.log(`- Node changes: ${changeFlags.nodeChanges ? 'Yes' : 'No'}`)
  console.log(`- Asset changes: ${changeFlags.assetChanges ? 'Yes' : 'No'}`)
  console.log(`- PHP changes: ${changeFlags.phpChanges ? 'Yes' : 'No'}`)

  return changeFlags
}

import util from 'util'

import { exec } from 'child_process'

const hasLintScript = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  return !!packageJson.scripts && !!packageJson.scripts.lint
}

const runLintAndCommit = async () => {
  if (hasLintScript()) {
    await exec('npm run lint')
    const { modified } = await git.status()
    if (modified.length > 0) {
      await git.add('.').commit('chore: lint')
    }
  }
}

const promptBranchAndMerge = async () => {
  await runLintAndCommit()

  const currentBranch = (await git.branchLocal()).current
  const branchChoices = await getBranchChoices()

  const { branchToMergeFrom } = await inquirer.prompt({
    type: 'list',
    name: 'branchToMergeFrom',
    message: 'Select the branch to merge from:',
    choices: branchChoices,
    default: currentBranch
  })

  if (branchToMergeFrom !== currentBranch) {
    try {
      await git.checkout(branchToMergeFrom)
    } catch (error) {
      console.error('Error checking out branch:', error)
      process.exit(1)
    }
  }

  try {
    await git.pull('origin', branchToMergeFrom)
  } catch (error) {
    console.error('Error updating repository. Manual merge required:', error)
    process.exit(1)
  }

  const differences = await git.diff([currentBranch, `origin/${selectedServerConfig.branch}`, '--name-status'])
  const changeFlags = processDifferences(differences)

  if (changeFlags.assetChanges) {
    console.log('Building assets...')
    await exec('npm run build')
  }

  const statusAfterBuild = await git.status()
  if (statusAfterBuild.not_added.length === 0 && statusAfterBuild.modified.length === 0 && statusAfterBuild.created.length === 0 && statusAfterBuild.deleted.length === 0 && statusAfterBuild.renamed.length === 0) {
    console.log(`Pushing to ${branchToMergeFrom}`)
    await git.push('origin', branchToMergeFrom)
  } else {
    await git.add('.').commit('chore: post-build adjustments')
    await git.push('origin', branchToMergeFrom)
  }

  if (branchToMergeFrom !== selectedServerConfig.branch) {
    try {
      await git.checkout(selectedServerConfig.branch)
      await git.merge([branchToMergeFrom])
      await git.push('origin', selectedServerConfig.branch)
      console.log(`Merged changes from ${branchToMergeFrom} into ${selectedServerConfig.branch} and pushed to remote.`)
    } catch (error) {
      console.error(`Error merging changes into ${selectedServerConfig.branch}:`, error)
      process.exit(1)
    }
  } else {
    await git.push('origin', branchToMergeFrom)
  }

  return changeFlags
}


import { NodeSSH } from 'node-ssh'

const ssh = new NodeSSH()

const logToFile = (message) => {
  fs.appendFileSync('release.log', `${new Date().toISOString()} - ${message}\n`)
}

const runSSHCommands = async (commands) => {
  try {
    for (const command of commands) {
      logToFile(`Executing: ${command}`)
      console.log(`Executing "${command}"`)
      const result = await ssh.execCommand(command, { cwd: selectedServerConfig.path })
      if (result.code !== 0) {
        logToFile(`Error: ${result.stderr}`)
        throw new Error(result.stderr)
      }
      logToFile(result.stdout)
    }
  } catch (error) {
    console.error('SSH command execution error:', error)
    process.exit(1)
  }
}

const deployToServer = async (flags) => {
  console.log(`Connecting to ${selectedServerConfig.ip}...`)
  await ssh.connect({
    host: selectedServerConfig.ip,
    username: selectedServerConfig.username,
    privateKeyPath: selectedServerConfig.sshKeyPath
  })

  const commands = ['php artisan down']

  if (flags.composerChanges) commands.push('composer update --no-dev')
  if (flags.databaseChanges) {
    const { shouldMigrate } = await inquirer.prompt({
      type: 'confirm',
      name: 'shouldMigrate',
      message: 'Do you want to run php artisan migrate --force?'
    })
    if (shouldMigrate) commands.push('php artisan migrate --force')
  }
  if (flags.nodeChanges) {
    commands.push('npm install', 'npm run build')
  }
  if (flags.phpChanges) {
    commands.push('php artisan view:clear', 'php artisan cache:clear', 'php artisan config:clear', 'php artisan horizon:terminate')
  }
  commands.push('php artisan up')

  await runSSHCommands(commands)

  ssh.dispose()

  let message = `Deployment process to ${selectedServerConfig.ip} for branch ${selectedServerConfig.branch} completed successfully.`
  logToFile(message)
  console.log(message)
}

export default class ReleaseLaravel extends Command {
  signature = 'release:laravel'
  description = 'A sample description of the command.'

  async handle() {
    try {
      await checkForUncommittedFiles()
      await createRuncloudConfig()
      const flags = await promptBranchAndMerge()
      await deployToServer(flags)
    } catch (error) {
      logToFile(`Process error: ${error}`)
      console.error('Process encountered an error:', error)
    }
  }
}

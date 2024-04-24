import Command from '../Command.mjs'

import simpleGit from 'simple-git'
import inquirer from 'inquirer'

const git = simpleGit()

const initialBranch = await git.revparse(['--abbrev-ref', 'HEAD'])

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
      logToFile('Error reading runcloud.json:', error)
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
    console.log('Linting repository...')
    await runCommandAndLog('npm run lint')
    const { modified } = await git.status()
    if (modified.length > 0) {
      console.log('Adding lint changes to repo...')
      await git.add('.')
      console.log('Committing lint changes to repo...')
      await git.commit('chore: lint')
    }
  }
}

const promptBranchAndMerge = async () => {
  // Ensure all ongoing changes are committed
  await checkForUncommittedFiles()

  const branchChoices = await getBranchChoices()

  const preselectedBranchIndex = branchChoices.findIndex(branch => branch.value === initialBranch)

  const { branchToMergeFrom } = await inquirer.prompt({
    type: 'list',
    name: 'branchToMergeFrom',
    message: 'Select the branch to merge from:',
    choices: branchChoices,
    default: preselectedBranchIndex
  })

  // Update the branch with changes
  console.log(`Checkout ${branchToMergeFrom}`)
  await git.checkout(branchToMergeFrom)

  console.log(`Updating ${branchToMergeFrom}`)
  await git.pull('origin', branchToMergeFrom, { '--rebase': 'true' })

  await runLintAndCommit()

  // Check if there are asset changes before running build
  const differences = await git.diff([branchToMergeFrom, `origin/${branchToMergeFrom}`, '--name-status'])
  const changeFlags = processDifferences(differences)

  if (changeFlags.assetChanges) {
    console.log('Building assets...')
    await exec('npm run build')
  }

  console.log(`Pushing changes to ${branchToMergeFrom}`)
  await git.push('origin', branchToMergeFrom)


  if (branchToMergeFrom !== selectedServerConfig.branch) {
// Switch to the target branch set in server configuration, merge changes from the source branch
    const targetBranch = selectedServerConfig.branch
    console.log(`Switching to ${targetBranch}`)
    await git.checkout(targetBranch)
    console.log(`Updating ${targetBranch}`)
    await git.pull('origin', targetBranch, { '--rebase': 'true' })

    // Merge changes from the source branch
    try {
      console.log(`Merging ${branchToMergeFrom} to ${targetBranch}`)
      await git.merge([branchToMergeFrom])
    } catch (mergeError) {
      console.error('Merge failed:', mergeError)
      process.exit(1)
    }

    // Push merged changes to remote
    console.log(`Pushing merge to ${targetBranch}`)
    await git.push('origin', targetBranch)
  } else {
    console.log('Target and current branch are the same. Proceeding with deployment.')
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
  const { confirmDown } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmDown',
    message: 'Do you want to put the application into maintenance mode (php artisan down)?'
  })

  let commands = []

  if (confirmDown) {
    commands.push('php artisan down')
  }

  commands.push('git pull origin ' + selectedServerConfig.branch)

  if (!flags.composerChanges) {
    const { proceedWithComposer } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceedWithComposer',
      message: 'No composer changes detected. Proceed with composer install?'
    })
    if (proceedWithComposer) {
      commands.push('composer install --no-interaction --no-dev --prefer-dist')
    }
  }

  if (!flags.databaseChanges) {
    const { proceedWithMigrations } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceedWithMigrations',
      message: 'No database changes detected. Proceed with migrations?'
    })
    if (proceedWithMigrations) {
      commands.push('php artisan migrate --force')
    }
  }

  if (!flags.phpChanges) {
    const { proceedWithPHP } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceedWithPHP',
      message: 'No PHP changes detected. Proceed with PHP scripts?'
    })
    if (proceedWithPHP) {
      commands.push('php artisan view:clear', 'php artisan cache:clear', 'php artisan config:clear')

      if (fs.existsSync('artisan') && fs.existsSync('composer.json')) {
        commands.push('php artisan horizon:terminate')
      }
    }
  } else {
    commands.push('php artisan view:clear', 'php artisan cache:clear', 'php artisan config:clear')

    if (fs.existsSync('artisan') && fs.existsSync('composer.json')) {
      commands.push('php artisan horizon:terminate')
    }
  }

  if (!flags.nodeChanges) {
    const { proceedWithNode } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceedWithNode',
      message: 'No node changes detected. Proceed with npm install?'
    })
    if (proceedWithNode) {
      commands.push('npm install')
    }
  } else {
    commands.push('npm install')
  }

  if (!flags.assetChanges) {
    const { proceedWithBuild } = await inquirer.prompt({
      type: 'confirm',
      name: 'proceedWithBuild',
      message: 'No asset changes detected. Proceed with npm run build?'
    })
    if (proceedWithBuild) {
      commands.push('npm run build')
    }
  }

  if (confirmDown) {
    commands.push('php artisan up')
  }

  console.log(`Connecting to ${selectedServerConfig.ip} with key ${selectedServerConfig.sshKeyPath}...`)
  await ssh.connect({
    host: selectedServerConfig.ip,
    username: selectedServerConfig.username,
    privateKeyPath: selectedServerConfig.sshKeyPath
  })

  await runSSHCommands(commands)

  ssh.dispose()

  let message = `Deployment process to ${selectedServerConfig.ip} for branch ${selectedServerConfig.branch} completed successfully.`
  logToFile(message)
  console.log(message)

  await git.checkout(initialBranch)
  console.log(`Returned to initial branch: ${initialBranch}`)
}

const runCommandAndLog = async (command) => {
  try {
    const { stdout, stderr } = await exec(command)
    logToFile(`Output: ${stdout}`)
    if (stderr) logToFile(`Error: ${stderr}`)
  } catch (error) {
    logToFile(`Execution error for command "${command}": ${error}`)
    throw error // Rethrow if you want to handle it or stop the execution
  }
}

export default class ReleaseLaravel extends Command {
  signature = 'release:laravel'
  description = 'A sample description of the command.'

  async handle() {
    try {
      await createRuncloudConfig()
      const flags = await promptBranchAndMerge()
      await deployToServer(flags)
    } catch (error) {
      logToFile(`Process error: ${error}`)
      console.error('Process encountered an error:', error)

      await git.checkout(initialBranch)
      console.log(`Returned to initial branch: ${initialBranch}`)
    }
  }
}

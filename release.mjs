import chalk from 'chalk'
import inquirer from 'inquirer'
import fs from 'fs'
import simpleGit from 'simple-git'

const git = simpleGit()

const packageJsonPath = './package.json'
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())
const currentVersion = packageJson.version

let defaultVersion = currentVersion.split('.')
defaultVersion[defaultVersion.length - 1] = Number(defaultVersion[defaultVersion.length - 1]) + 1
defaultVersion = defaultVersion.join('.')

const { version } = await inquirer.prompt([
  {
    name: 'version',
    message: `Enter the version to publish (current ${currentVersion})`,
    default: defaultVersion,
  },
])

packageJson.version = version

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

const tagVersion = `v${version}`
const commitMessage = `feat: release ${tagVersion}`

// Run linting
execSyncOut('npm run lint')

// Build the project
execSyncOut('npm run build')

const commitFiles = async () => {
  await git.add('.')
  await git.commit(commitMessage)
}

const createTag = async () => {
  await git.tag([tagVersion, '-m', tagVersion])
}

const pushChanges = async () => {
  await git.push('origin', 'main')
  await git.pushTags('origin')
}

const release = async () => {
  try {
    await commitFiles()
    await createTag()
    await pushChanges()
    console.log(chalk.green(`Successfully released version ${version}`))
  } catch (error) {
    console.error(chalk.red('Release process failed. Error:', error))
  }
}

release()

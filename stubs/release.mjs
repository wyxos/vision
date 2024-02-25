import {execSync} from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import fs from 'fs'

const execSyncOut = (command) => {
  execSync(command, { stdio: 'inherit' })
}

execSyncOut('npm run lint')

execSyncOut(
  `git add . && git commit -m lint || Echo "No file staged. Proceeding..."`
)

const json = JSON.parse(fs.readFileSync('./package.json').toString())

const currentVersion = json.version

let defaultVersion = currentVersion.split('.')

defaultVersion[defaultVersion.length - 1] =
  Number(defaultVersion[defaultVersion.length - 1]) + 1

defaultVersion = defaultVersion.join('.')

const { version } = await inquirer.prompt([
  {
    name: 'version',
    message: `Enter the version to publish (current ${currentVersion})`,
    default: defaultVersion
  }
])

json.version = version

fs.writeFileSync('./package.json', JSON.stringify(json, null, 2))

const tagVersion = `v${version}`

const message = `"feat: release ${tagVersion}"`

execSyncOut('npm install')

execSyncOut('npm run build')

execSyncOut('git add .')

execSyncOut(`git commit -m ${message}`)

execSyncOut('git push')

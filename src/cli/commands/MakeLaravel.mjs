import path from 'path'
import Command from '../Command.mjs'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import { spawn } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const stubsPath = path.join(__dirname, '../../../stubs/MakeLaravel')

export default class MakeLaravel extends Command {
  signature = 'make:laravel <projectName>'
  description = 'Automate setup of a Laravel project in Homestead.'
  config = null
  projectName = null

  getOptions() {
    return [
      { flag: '--mode <mode>', description: 'Specify the setup mode (homestead or valet)', defaultValue: 'valet' }
    ]
  }

  isValet() {
    return this.mode === 'valet'
  }

  async handle(projectName, options) {
    this.projectName = projectName
    this.mode = options.mode

    if (this.isValet()) {
      return this.createProjectWithValet(projectName, options)
    } else {
      // Implement other modes if necessary
    }
  }

  async createProjectWithValet(projectName, options) {
    exec('valet paths', async (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(`Error retrieving Valet paths: ${error || stderr}`)
        return
      }

      let paths = stdout.replace('[', '')
        .replace(']', '')
        .replace(',', '')
        .trim()
        .split('\n')
        .map(value => value.replace(/"/g, '').trim())

      if (paths.length > 1) {
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'valetPath',
            message: 'Choose a Valet path for the new project:',
            choices: paths
          }
        ])

        await this.checkAndCreateProject(answers.valetPath, projectName, options)
      } else {
        await this.checkAndCreateProject(paths[0], projectName, options)
      }
    })
  }

  async checkAndCreateProject(valetPath, projectName, options) {
    const projectPath = path.join(valetPath, projectName)

    // Check if project exists
    if (existsSync(projectPath)) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Project exists at ${projectPath}. Overwrite?`,
          default: false
        }
      ])

      if (!answers.overwrite) {
        console.log('Project creation skipped.')
        return
      }

      options.force = true
    }

    // Use spawn to run the command and show output in real-time
    const laravelNewCommand = `laravel`
    const args = [
      'new',
      projectName,
      ...(options.force ? ['--force'] : []),
      '--breeze',
      '--stack',
      'blade',
      '--verification',
      '--git',
      '--phpunit',
      '-n'
    ]

    const laravelProcess = spawn(laravelNewCommand, args, {
      cwd: valetPath,
      stdio: 'inherit', // Use 'inherit' to show output in the parent process' stdio
      shell: true // Use shell to interpret the command
    })

    laravelProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`Project created at ${projectPath}`)
      } else {
        console.error(`Error creating Laravel project with exit code ${code}`)
      }
    })
  }
}

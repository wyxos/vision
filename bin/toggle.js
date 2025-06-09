#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// Check if the command is "toggle"
const args = process.argv.slice(2)
if (args.length > 0 && args[0] !== 'toggle') {
  console.error('Usage: npx @wyxos/vision toggle')
  process.exit(1)
}

// Get the current working directory (where the command is run)
const cwd = process.cwd()

// Path to the package.json file in the current directory
const packageJsonPath = path.join(cwd, 'package.json')

// Check if package.json exists
if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.')
  process.exit(1)
}

// Read the package.json file
let packageJson
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
} catch (error) {
  console.error('Error reading package.json:', error.message)
  process.exit(1)
}

// Check if @wyxos/vision is in dependencies or devDependencies
const dependencies = packageJson.dependencies || {}
const devDependencies = packageJson.devDependencies || {}

let dependencyType = null
let currentVersion = null

if (dependencies['@wyxos/vision']) {
  dependencyType = 'dependencies'
  currentVersion = dependencies['@wyxos/vision']
} else if (devDependencies['@wyxos/vision']) {
  dependencyType = 'devDependencies'
  currentVersion = devDependencies['@wyxos/vision']
} else {
  console.error(
    'Error: @wyxos/vision is not found in dependencies or devDependencies.'
  )
  process.exit(1)
}

// Toggle between local path and latest version
if (currentVersion.startsWith('file:')) {
  // Currently using local path, switch to latest version
  console.log(
    'Switching from local development version to latest published version...'
  )

  try {
    // Get the latest version from npm
    const latestVersion = execSync('npm show @wyxos/vision version', {
      encoding: 'utf8'
    }).trim()

    // Update package.json
    packageJson[dependencyType]['@wyxos/vision'] = `^${latestVersion}`

    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    console.log(
      `Successfully switched to latest published version (${latestVersion}).`
    )
    console.log('Run "npm install" to update your node_modules.')
  } catch (error) {
    console.error('Error getting latest version:', error.message)
    process.exit(1)
  }
} else {
  // Currently using published version, switch to local path
  console.log(
    'Switching from published version to local development version...'
  )

  // Update package.json
  packageJson[dependencyType]['@wyxos/vision'] = 'file:../../js/wyxos/vision'

  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  console.log('Successfully switched to local development version.')
  console.log('Run "npm install" to update your node_modules.')
}

import { runcloudApi } from '../../helpers/runcloudApi.mjs'
import inquirer from 'inquirer'

export default async function selectServer() {
  console.log('Fetching list of servers and shared servers...')
  const serversResponse = await runcloudApi('GET', 'servers')

  console.log('Servers found: ', serversResponse.data.length)

  const sharedServers = await runcloudApi('GET', 'servers/shared')

  console.log('Shared Servers found: ', sharedServers.data.length)

  const servers = [
    ...serversResponse.data,
    ...sharedServers.data
  ]

  if (servers.length > 0) {
    // Prompt the user to select a server
    const serverChoice = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedServer',
        message: 'Select a server:',
        choices: servers.map(server => ({ name: server.name, value: server.id }))
      }
    ])

    const selectedServerId = serverChoice.selectedServer
    console.log(`Selected server ID: ${selectedServerId}`)

    return servers.find(server => server.id === selectedServerId)
  } else {
    // No server available, logic to create server and return instance
    console.error('No servers found on your Runcloud account.')
    process.exit(1)
  }
}

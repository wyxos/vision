import Oruga from '@oruga-ui/oruga-next'
import errorHandlerSetup from './errorHandlerSetup.js'

const components = import.meta.glob('./components/*.vue', { eager: true })

const MappedComponents = {}

const install = (app, options = {}) => {
  options = { ...{ vision: {}, oruga: {}, use: { oruga: true } }, ...options }

  if (options.use.oruga) {
    app.use(Oruga, options.oruga)
  }

  Object.keys(components).forEach((key) => {
    const componentModule = components[key]
    if (componentModule && componentModule.default) {
      const component = componentModule.default
      const name = component.name

      if (name) {
        app.component(name, component)
        app.component(name.replace('Wyxos', 'W'), component)
        MappedComponents[name] = component
      } else {
        // use the file name as name
        const fileName = key.split('/').pop().split('.')[0]
        app.component(fileName, component)
        app.component(fileName.replace('Wyxos', 'W'), component)
        MappedComponents[fileName] = component
      }
    } else {
      console.error(`Could not load component from '${key}'`)
    }
  })

  app.config.globalProperties.$v = {
    to: (name, params) => {
      return {
        name,
        params
      }
    }
  }

  errorHandlerSetup(options)
}

export default {
  install,
  ...MappedComponents
}

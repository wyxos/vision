import Oruga from '@oruga-ui/oruga-next'
import errorHandlerSetup from './errorHandlerSetup'

const components = import.meta.glob('./components/*.vue', { eager: true })

const MappedComponents = {}

const install = (app, options = { vision: {}, oruga: {} }) => {
  app.use(Oruga, options.oruga)

  Object.keys(components).forEach((key) => {
    const name = components[key].default.name
    const component = components[key].default
    app.component(name, component)
    app.component(name.replace('Wyxos', 'W'), component)
    MappedComponents[name] = component
  })

  errorHandlerSetup(options)
}

export default {
  install,
  ...MappedComponents
}

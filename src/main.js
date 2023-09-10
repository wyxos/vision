import Oruga from '@oruga-ui/oruga-next'

const components = import.meta.glob('./components/*.vue', { eager: true })

const MappedComponents = {}

const install = (app, options = { vision: {}, oruga: {} }) => {
  Oruga.install(app, options.oruga)

  Object.keys(components).forEach((key) => {
    const name = components[key].default.name
    const component = components[key].default
    app.component(name, component)
    app.component(name.replace('Wyxos', 'W'), component)
    MappedComponents[name] = component
  })
}

export default {
  install,
  ...MappedComponents
}

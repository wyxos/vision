const components = import.meta.glob('./components/*.vue', {eager: true})

const MappedComponents = {}

const install = (app) => {
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
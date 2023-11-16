import Oruga from '@oruga-ui/oruga-next'
import errorHandlerSetup from './errorHandlerSetup'

const components = import.meta.glob('./components/*.vue', {eager: true})

const MappedComponents = {}

const install = (app, options = {vision: {}, oruga: {}}) => {
    app.use(Oruga, options.oruga)

    Object.keys(components).forEach((key) => {
        const componentModule = components[key];
        if (componentModule && componentModule.default) {
            const component = componentModule.default;
            const name = component.name;

            if (name) {
                app.component(name, component);
                app.component(name.replace('Wyxos', 'W'), component);
                MappedComponents[name] = component;
            } else {
                console.error(`Component in '${key}' does not have a name property`);
            }
        } else {
            console.error(`Could not load component from '${key}'`);
        }
    });

    app.config.globalProperties.$v = {
        to: (name, params) => {
            return {
                name,
                params
            }
        },
    };

    errorHandlerSetup(options)
}

export default {
    install,
    ...MappedComponents
}

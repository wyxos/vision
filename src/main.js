import FormBuilder from './utilities/FormBuilder.js'
import Listing from './utilities/Listing.js'
import WyxosError from './components/WyxosError.vue'

export { FormBuilder, Listing, WyxosError }

export default {
  FormBuilder,
  Listing,
  WyxosError
}

// import {
//   OAutocomplete,
//   OButton,
//   OCheckbox,
//   ODatepicker,
//   OField,
//   OIcon,
//   OInput,
//   OModal,
//   ONotification,
//   ORadio,
//   OSelect,
//   OTabItem,
//   OTable,
//   OTableColumn,
//   OTabs,
//   OTaginput,
//   OTooltip,
//   OUpload
// } from '@oruga-ui/oruga-next'
// import errorHandlerSetup from './errorHandlerSetup.js'
//
// const components = import.meta.glob('./components/*.vue', { eager: true })
//
// const MappedComponents = {}
//
// const install = (app, options = {}) => {
//   options = { ...{ vision: {} }, ...options }
//
//   app.component('OButton', OButton)
//   app.component('OField', OField)
//   app.component('ORadio', ORadio)
//   app.component('OModal', OModal)
//   app.component('OTooltip', OTooltip)
//   app.component('OTable', OTable)
//   app.component('OTableColumn', OTableColumn)
//   app.component('OTabs', OTabs)
//   app.component('OTabItem', OTabItem)
//   app.component('OTaginput', OTaginput)
//   app.component('ODatepicker', ODatepicker)
//   app.component('OSelect', OSelect)
//   app.component('OInput', OInput)
//   app.component('OIcon', OIcon)
//   app.component('OUpload', OUpload)
//   app.component('OCheckbox', OCheckbox)
//   app.component('ONotification', ONotification)
//   app.component('OAutocomplete', OAutocomplete)
//
//   Object.keys(components).forEach((key) => {
//     const componentModule = components[key]
//     if (componentModule && componentModule.default) {
//       const component = componentModule.default
//       const name = component.name
//
//       if (name) {
//         app.component(name, component)
//         app.component(name.replace('Wyxos', 'W'), component)
//         MappedComponents[name] = component
//       } else {
//         // use the file name as name
//         const fileName = key.split('/').pop().split('.')[0]
//         app.component(fileName, component)
//         app.component(fileName.replace('Wyxos', 'W'), component)
//         MappedComponents[fileName] = component
//       }
//     } else {
//       console.error(`Could not load component from '${key}'`)
//     }
//   })
//
//   app.config.globalProperties.$v = {
//     to: (name, params) => {
//       return {
//         name,
//         params
//       }
//     }
//   }
//
//   errorHandlerSetup(options)
// }
//
// export const vn = {
//   route(name, params, query) {
//     return {
//       name,
//       params,
//       query
//     }
//   }
// }
//
// export default {
//   install,
//   ...MappedComponents,
//   vn
// }

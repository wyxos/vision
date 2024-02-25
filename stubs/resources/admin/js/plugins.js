import Oruga from '@oruga-ui/oruga-next'
import router from './core/vue-router-setup'
import VueHelpers from '@wyxos/vision'

export default function plugins (app) {
  app.use(Oruga, { iconPack: 'fas' })
  app.use(router)
  app.use(VueHelpers)
}

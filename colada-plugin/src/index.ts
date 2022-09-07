import { setupDevtools, PiniaColadaPlugin} from './devtools'

export default {
  install (app: any, options = {}) {
    setupDevtools(app)
  }
}

export { PiniaColadaPlugin }



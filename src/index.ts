import component from './component.vue'
import directive from './directive'
import options, { Options as Config } from './options'
import NumberFormat from './number-format'

export { component, directive, options, NumberFormat }

function install(app: any, config?: Config) {
  if (config) {
    Object.assign(options, config)
  }
  app.directive('number', directive)
  app.component('VueNumber', component)
}

export default install

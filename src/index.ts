import component from './component.vue'
import directive from './directive'
import options, { Options as Config } from './options'
import NumberFormat from './number-format'

export { component, directive, options, NumberFormat }

export default {
  install(Vue: any, config?: Config) {
    if (config) {
      Object.assign(options, config)
    }
    Vue.directive('number', directive)
    Vue.component('VueNumber', component)
  }
}

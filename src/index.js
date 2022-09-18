import number from './component.vue'
import vNumber from './directive'
import options from './options'
import NumberFormat from './number-format'

export { number, vNumber, options, NumberFormat }

const VueNumberFormat = {
  install(app, config = {}) {
    if (config) {
      Object.assign(options, config)
    }
    app.directive('number', vNumber)
    app.component('number', number)
  },
}

export default VueNumberFormat

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNumberFormat)
}

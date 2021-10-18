import Number from './component.vue'
import VNumber from './directive'
import Options from './options'
import NumberFormat from './number-format'

export {
  Number,
  VNumber,
  Options,
  NumberFormat
}

export default {
  install(app, config) {
    if (config) {
      Object.assign(Options, config)
    }
    app.directive('number', directive)
    app.component('number', component)
  }
}

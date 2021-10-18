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

function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.assign(Options, globalOptions)
  }
  Vue.directive('number', VNumber)
  Vue.component('number', Number)
}

export default install

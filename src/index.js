import Number from './component.vue'
import VNumber from './directive'
import options from './options'
import NumberFormat from './number-format'

export {
  NumberFormat,
  Number,
  VNumber,
  options
}

function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.assign(options, globalOptions)
  }
  Vue.directive('number', VNumber)
  Vue.component('number', Number)
}

export default install

import number from './component.vue'
import vNumber from './directive'
import options from './options'
import NumberFormat from './number-format'

export {
  number,
  vNumber,
  options,
  NumberFormat
}

function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.assign(options, globalOptions)
  }
  Vue.directive('number', vNumber)
  Vue.component('number', number)
}

export default install

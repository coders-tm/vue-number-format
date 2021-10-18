import number from './component.vue'
import vNumber from './directive'
import Options from './options'
import NumberFormat from './number-format'

export {
  number,
  vNumber,
  Options,
  NumberFormat
}

function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.assign(Options, globalOptions)
  }
  Vue.directive('number', vNumber)
  Vue.component('number', number)
}

export default install

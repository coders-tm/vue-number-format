import Number from './component.vue'
import VNumber from './directive'
import options from './options'

export {
  Number,
  VNumber,
  options
}

function install (Vue, globalOptions) {
  if (globalOptions) {
    Object.keys(globalOptions).map(function(key){
      options[key] = globalOptions[key]
    })
  }
  Vue.directive('number', VNumber)
  Vue.component('number', Number)
}

export default install

import component from './component'
import options, { Options as Config } from './options'

export { component, options }

function install(Vue: any, globalOptions?: Config) {
  if (globalOptions) {
    Object.assign(options, globalOptions)
  }
  Vue.component('VueNumber', component)
}

export default install

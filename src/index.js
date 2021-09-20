import component from './component.vue'
import directive from './directive'
import options from './options'

export {
  component,
  directive,
  options
}

export default {
  install(app, config) {
    if (config) {
      Object.assign(options, config)
    }
    app.directive('number', directive)
    app.component('number', component)
  }
}

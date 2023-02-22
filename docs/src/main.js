import Vue from 'vue'
import App from './App.vue'

import VueNumberFormat from '../../'

Vue.config.productionTip = false
Vue.use(VueNumberFormat)

new Vue({
  render: (h) => h(App)
}).$mount('#app')

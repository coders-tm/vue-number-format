/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import number from '../../'
import Quasar from 'quasar'
import 'quasar/dist/quasar.min.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
  Vue.use(Quasar, {
    config: {
      dark: false // or Boolean true/false
    }
  })
  Vue.use(number)
}

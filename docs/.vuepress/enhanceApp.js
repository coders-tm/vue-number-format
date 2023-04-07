/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueNumber from '../../'

import 'tailwindcss/dist/base.css'
import 'tailwindcss/dist/components.css'
import 'tailwindcss/dist/utilities.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
  Vue.use(VueNumber)
}

import DefaultTheme from 'vitepress/theme'
import number from '../../src'
import Quasar from 'quasar'
import 'quasar/dist/quasar.min.css'
export default {
  DefaultTheme,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.

    // ...apply enhancements for the site.
    app.use(Quasar, {
      config: {
        dark: false // or Boolean true/false
      }
    })
    app.use(number)
  }
}

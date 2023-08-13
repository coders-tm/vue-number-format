import { defineClientConfig } from '@vuepress/client'
import VueNumber from '../../'

import 'virtual:windi.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(VueNumber)
  },
  setup() {},
  rootComponents: []
})

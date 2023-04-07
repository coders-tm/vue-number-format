const { defineConfig } = require('windicss/helpers')
const { generateCSS } = require('windicss')

module.exports = (options = {}, ctx) => {
  const windiOptions = defineConfig({
    scan: {
      dirs: ['.vuepress/theme', '.vuepress/components'],
      exclude: ['node_modules', '.git', '.vuepress']
    }
  })

  return {
    name: 'vuepress-plugin-windicss',
    clientDynamicModules() {
      return {
        name: 'windi.css',
        content: generateCSS(windiOptions)
      }
    }
  }
}

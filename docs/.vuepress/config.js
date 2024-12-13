import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { getDirname, path } from '@vuepress/utils'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import formsPlugin from 'windicss/plugin/forms'
import pkg from '../../package.json'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'en-US',
  title: 'Vue Number Format',
  description: pkg.description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'Tf6UVeu-ZmZtGqB5tdcYymZ79101gyGKcpzqwWhDb1U'
      }
    ]
  ],

  // bundler options
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        WindiCSS({
          preflight: false,
          scan: {
            include: [resolve(__dirname, './**/*.{vue,html,md}')],
            exclude: ['node_modules/**/*', '.git/**/*']
          },
          theme: {
            extend: {
              colors: {
                primary: '#3eaf7c'
              }
            }
          },
          plugins: [formsPlugin]
        })
      ]
    },
    vuePluginOptions: {}
  }),

  // theme and its config
  theme: defaultTheme({
    logo: '/favicon.png',
    editLinks: false,
    repo: 'coders-tm/vue-number-format',
    lastUpdated: true,
    navbar: [
      {
        text: '❤ Sponsor',
        link: 'https://ko-fi.com/dipaksarkar'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['/guide/README.md', '/guide/config.md', '/guide/integration.md', '/guide/play-ground.md']
        }
      ]
    }
  }),
  darkMode: false,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search'
        }
      }
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
    googleAnalyticsPlugin({
      id: 'UA-76508942-4'
    })
  ]
})

const { description } = require('../../package')
const { resolve } = require('path')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  // dev server port
  port: 8080,

  // site config
  lang: 'en-US',
  title: 'Vue Number Format',
  description: description,
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

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/favicon.png',
    editLinks: false,
    repo: 'coders-tm/vue-number-format',
    lastUpdated: true,
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'config', 'integration', 'play-ground']
        }
      ]
    }
  },
  darkMode: false,

  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: ['@vue/babel-preset-jsx']
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsxSuffixTo: [/\.vue$/]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new WindiCSSWebpackPlugin({
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
        plugins: [require('windicss/plugin/forms')]
      })
    ]
  }
}

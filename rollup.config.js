import vue from 'rollup-plugin-vue'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

const banner = `/**
 * Vue Number Format ${pkg.version}
 * (c) 2018-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default [
  {
    input: `src/index.js`,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        banner
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        banner
      }
    ],
    plugins: [
      css({
        output: pkg.style,
      }),
      vue({
        template: {
          isProduction: true,
        },
        css: false,
      }),
      cleanup({
        extensions: [
          'js'
        ]
      }),
      filesize()
    ]
  }
]

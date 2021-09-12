import vue from 'rollup-plugin-vue'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
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
        name: 'VNumber',
        sourcemap: true,
        banner
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        name: 'VNumber',
        sourcemap: true,
        banner
      },
      {
        file: pkg.unpkg,
        format: 'iife',
        exports: 'named',
        name: 'VNumber',
        sourcemap: true,
        banner
      }
    ],
    plugins: [
      cleanup({
        extensions: [
          'js',
          'vue'
        ]
      }),
      vue({
        template: {
          isProduction: true,
        },
      }),
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src'
        }
      }),
      filesize()
    ],
    external: ['vue-demi']
  }
]

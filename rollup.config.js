import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner = `/**
 * Vue Number Format ${pkg.version}
 * (c) 2021-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default [
  {
    input: `src/index.ts`,
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
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true
          }
        }
      }),
      vue(),
      cleanup({ extensions: ['js', 'ts'] }),
      filesize()
    ],
    external: ['vue']
  },
  {
    input: 'dist/src/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()]
  }
]

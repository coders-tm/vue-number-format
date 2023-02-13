import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner = `/**
 * Vue Number Format ${pkg.version}
 * (c) 2021-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        compact: true,
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        name: 'VueNumberFormat',
        banner
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        banner
      }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      }),
      resolve(),
      commonjs(),
      filesize()
    ],
    external: ['vue']
  },
  {
    input: './.temp/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]

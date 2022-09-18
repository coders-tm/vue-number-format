import vue from 'rollup-plugin-vue'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner = `/**
 * Vue Number Format ${pkg.version}
 * (c) 2021-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default {
  input: 'src/index.js',
  external: ['vue'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      banner,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      banner,
    },
    {
      file: pkg.browser,
      name: 'VueNumberFormat',
      format: 'iife',
      exports: 'named',
      banner,
      globals: { vue: 'Vue' },
    },
  ],
  plugins: [vue(), filesize()],
}

import vue from 'rollup-plugin-vue'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner = `/**
 * Vue Currency Input ${pkg.version}
 * (c) 2018-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default {
  input: 'src/index.js',
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
    vue(),
    filesize()
  ]
}

import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

const banner = `/**
 * Vue Number Format ${pkg.version}
 * (c) 2018-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

const baseConfig = {
  input: 'src/index.js',
  plugins: {
    preVue: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      commonjs(),
    ],
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      buble({
        transforms: {
          dangerousForOf: true,
        },
      }),
      filesize(),
    ],
  },
};

export default [
  {
    ...baseConfig,
    output: {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      css({
        output: pkg.style,
      }),
      vue({
        ...baseConfig.plugins.vue,
        css: false,
      }),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 6,
        },
      }),
      resolve(),
    ],
  },
  {
    ...baseConfig,
    output: {
      compact: true,
      file: pkg.main,
      format: 'cjs',
      name: 'VueNumberFormat',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      css({
        output: pkg.style,
      }),
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
        css: false,
      }),
      ...baseConfig.plugins.postVue,
      resolve(),
    ],
  },
  {
    ...baseConfig,
    output: {
      compact: true,
      file: pkg.unpkg,
      format: 'iife',
      name: 'VueNumberFormat',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 5,
        },
      }),
      resolve(),
    ],
  },
];

# Introduction

[![npm Version](https://badgen.net/npm/v/@coders-tm/vue-number-format?color=green)](https://www.npmjs.com/package/@coders-tm/vue-number-format)
[![npm Downloads](https://badgen.net/npm/dt/@coders-tm/vue-number-format?color=green)](https://www.npmjs.com/package/@coders-tm/vue-number-format)
[![github Stars](https://badgen.net/github/stars/coders-tm/vue-number-format?color=green)](https://www.npmjs.com/package/@coders-tm/vue-number-format)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/@coders-tm/vue-number-format?color=green)](https://bundlephobia.com/result?p=@coders-tm/vue-number-format)
[![License](https://badgen.net/github/license/coders-tm/vue-number-format?color=green)](https://github.com/coders-tm/vue-number-format/blob/master/LICENSE)

Vue Number Format is used to format a number using fixed-point notation. It can be used to format a number with a specific number of digits to the right of the decimal.

::: tip SPONSOR
[We Offer Web Hosting Fast, Secure & Easy To Manage](https://goazh.com/) <br>
<small>
Unlimited Storage, 99% Uptime Guarantee, Free Wildcard SSL Certificates, 30-Day Money-Back Guarantee<br>
Get all the essentials features Starting at £0.99/mo<br>
[https://goazh.com/](https://goazh.com/)
</small>
:::

## Installation

::: warning
Install the npm package @coders-tm/vue-number-format@^2.18.0 for Vue 2.0
:::

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add @coders-tm/vue-number-format
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install @coders-tm/vue-number-format
```

  </CodeGroupItem>
</CodeGroup>

## Usage

Vue Number Format provide a ready-to-use component. But, it enables you to create your own based on your favorite input component (for example Quasar or Vuetify).

### Globally

```js
import Vue from 'vue'
import VueNumberFormat from '@coders-tm/vue-number-format'

// register directive v-number and component <number>
Vue.use(VueNumberFormat, { precision: 4 })
```

### Use as component

```html
<template>
  <div><vue-number v-model="price" v-bind="number"></vue-number> {{price}}</div>
</template>

<script>
  import { component as VueNumber } from '@coders-tm/vue-number-format'

  export default {
    components: {
      VueNumber,
    },

    data() {
      return {
        price: 123.45,
        number: {
          decimal: '.',
          separator: ',',
          prefix: '$ ',
          precision: 2,
          masked: false,
        },
      }
    },
  }
</script>
```

### Use as directive

Can be use `vmodel.lazy` to bind works properly.

::: warning
Masking doesn't work with directive
:::

```html
<template>
  <div><input v-model.lazy="price" v-number="number" /> {{price}}</div>
</template>

<script>
  import { directive as VNumber } from '@coders-tm/vue-number-format'

  export default {
    data() {
      return {
        price: 123.45,
        number: {
          decimal: '.',
          separator: ',',
          prefix: '$ ',
          precision: 2,
        },
      }
    },

    directives: {
      number: VNumber,
    },
  }
</script>
```

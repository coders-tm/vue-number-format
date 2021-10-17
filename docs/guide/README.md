# Introduction
Vue Number Format is used to format a number using fixed-point notation. It can be used to format a number with a specific number of digits to the right of the decimal.
## Installation
Install the npm package: @coders-tm/vue-number-format@2.0.4 for Vue 2.0

```bash
npm install @coders-tm/vue-number-format
or
yarn add @coders-tm/vue-number-format
```
## Usage
Vue Number Format provide a ready-to-use component. But, it enables you to create your own based on your favorite input component (for example Quasar or Vuetify).

### Globally

```js
import Vue from 'vue'
import number from 'vue-number-format'

// register directive v-number and component <number>
Vue.use(number, {precision: 4})
```

### Use as component

```html
<template>
  <div>
    <number v-model="price" v-bind="number"></number> {{price}}
  </div>
</template>

<script>
  import { Number } from 'vue-number-format'

  export default {
    components: {
      Number
    },

    data () {
      return {
        price: 123.45,
        number: {
          decimal: '.',
          separator: ',',
          prefix: '$ ',
          suffix: ' #',
          precision: 2,
          masked: false
        }
      }
    }
  }
</script>
```

### Use as directive
Can be use `vmodel.lazy` to bind works properly.
```html
<template>
  <div>
    <input v-model.lazy="price" v-number="number" /> {{price}}
  </div>
</template>

<script>
  import { VNumber } from 'vue-number-format'

  export default {
    data () {
      return {
        price: 123.45,
        number: {
          decimal: '.',
          separator: ',',
          prefix: '$ ',
          suffix: ' #',
          precision: 2,
          masked: false /* doesn't work with directive */
        }
      }
    },

    directives: {
      number: VNumber
    }
  }
</script>
```

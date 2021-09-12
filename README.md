# vue-number-format

## Features

- Lightweight < 2kb
- Dependency free
- Mobile support
- Component or Directive flavors
- Accept copy/paste
- Editable

## Demo
[https://coders-tm.github.io/vue-number-format/](https://coders-tm.github.io/vue-number-format/)
## Usage

### A. Globally

```js
import Vue from 'vue'
import number from 'vue-number-format'

// register directive v-number and component <number>
Vue.use(number, {precision: 4})
```

### B. Use as component

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

### C. Use as directive
Must use `vmodel.lazy` to bind works properly.
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

## Properties

| property  | Required | Type    | Default | Description                                             |
|-----------|----------|---------|---------|---------------------------------------------------------|
| precision | false    | Number  | 2       | How many decimal places                                 |
| decimal   | false    | String  | "."     | Decimal separator                                       |
| separator | false    | String  | ","     | Thousands separator                                     |
| prefix    | false    | String  | ""      | Currency symbol followed by a Space, like "$ "         |
| suffix    | false    | String  | ""      | Percentage for example: " %"                            |
| masked    | false    | Boolean | false   | If the component output should include the mask or not  |

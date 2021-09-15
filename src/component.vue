<template>
  <input
    type="text"
    autocomplete="off"
    :value="formattedValue"
    @change="change"
    v-number="{precision, decimal, separator, prefix, suffix}"
    class="v-number"
  />
</template>

<script>
import directive from './directive'
import options from './options'
import { NumberFormat } from './utils'

export default {
  props: {
    value: {
      required: true,
      type: [Number, String]
    },
    null_value: {
      type: [Number, String],
      default: () => options.null_value
    },
    masked: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: () => options.precision
    },
    decimal: {
      type: String,
      default: () => options.decimal
    },
    separator: {
      type: String,
      default: () => options.separator
    },
    prefix: {
      type: String,
      default: () => options.prefix
    },
    suffix: {
      type: String,
      default: () => options.suffix
    }
  },

  directives: {
    number: directive
  },

  data() {
    return {
      formattedValue: ''
    }
  },

  watch: {
    masked: {
      immediate: true,
      deep: true,
      handler() {
        // console.log('src/component.vue:watch()', val)
        const number = new NumberFormat(this.$props).clean()
        this.$emit('input', this.masked ? this.formattedValue : number.unformat(this.value))
      }
    }
  },

  methods: {
    change(evt) {
      // console.log('src/component.vue:change()', evt.target.value)
      const number = new NumberFormat(this.$props).clean()
      this.$emit('input', this.masked ? number.format(evt.target.value) : number.unformat(evt.target.value))
    }
  },
  mounted() {
    // console.log('src/component.vue:created()', this.value)
    this.formattedValue = new NumberFormat(this.$props).format(this.value)
  }
}
</script>

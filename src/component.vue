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
      type: [Number, String],
      default: 0,
    },
    null_value: {
      type: [Number, String],
      default: () => options.null_value,
    },
    masked: {
      type: Boolean,
      default: false,
    },
    precision: {
      type: Number,
      default: () => options.precision,
    },
    decimal: {
      type: String,
      default: () => options.decimal,
    },
    separator: {
      type: String,
      default: () => options.separator,
    },
    prefix: {
      type: String,
      default: () => options.prefix,
    },
    suffix: {
      type: String,
      default: () => options.suffix,
    },
  },

  directives: {
    number: directive,
  },

  data() {
    return {
      formattedValue: '',
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        const formatted = new NumberFormat(this.$props).format(newValue)
        if (formatted !== this.formattedValue) {
          this.formattedValue = formatted
        }
      },
    },
  },

  methods: {
    change(evt) {
      const number = new NumberFormat(this.$props).clean()
      this.$emit('input', this.masked ? number.format(evt.target.value) : number.unformat(evt.target.value))
    },
  },
}
</script>

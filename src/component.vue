<template>
  <input
    type="text"
    autocomplete="off"
    :value="maskedValue"
    @change="change"
    @input="input"
    v-number="config"
    class="v-number"
  />
</template>

<script>
import directive from './directive'
import { cloneDeep } from './core'
import defaultOptions from './options'

const options = cloneDeep(defaultOptions)

export default {
  name: 'Number',
  props: {
    modelValue: {
      required: true,
    },
    nullValue: {
      type: [Number, String],
      default: () => options.nullValue,
    },
    masked: {
      type: Boolean,
      default: false,
    },
    reverseFill: {
      type: Boolean,
      default: options.reverseFill,
    },
    prefill: {
      type: Boolean,
      default: options.prefill,
    },
    precision: {
      type: Number,
      default: () => options.precision,
    },
    minimumFractionDigits: {
      type: [Number, Boolean],
      default: () => options.minimumFractionDigits,
    },
    decimal: {
      type: String,
      default: () => options.decimal,
    },
    min: {
      type: [Number, Boolean],
      default: () => options.min,
    },
    max: {
      type: [Number, Boolean],
      default: () => options.max,
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
  emits: ['update:model-value', 'input:model-value'],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: null,
    }
  },
  methods: {
    input({ target }) {
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue
      this.$emit('input:model-value', this.emittedValue)
    },
    change() {
      this.$emit('update:model-value', this.emittedValue)
    },
  },
  computed: {
    emittedValue() {
      return this.masked ? this.maskedValue : this.unmaskedValue
    },
    config() {
      const config = {}
      Object.keys(this.$props)
        .filter((item) => item !== 'modelValue')
        .forEach((item) => {
          config[item] = this.$props[item]
        })
      return config
    },
  },
  watch: {
    modelValue(val) {
      if (this.unmaskedValue !== val) {
        this.maskedValue = val
      }
    },
  },
}
</script>

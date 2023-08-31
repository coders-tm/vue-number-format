<template>
  <input
    v-number="config"
    type="text"
    autocomplete="off"
    :value="maskedValue"
    class="v-number"
    @change="change"
    @input="input"
    @blur="(evt) => $emit('blur', evt)"
    @focus="(evt) => $emit('focus', evt)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import directive from './directive'
import { cloneDeep, CustomInputEvent, Input } from './core'
import defaultOptions from './options'

Vue.directive('number', directive)

const options = cloneDeep(defaultOptions)

export default Vue.extend({
  name: 'VueNumber',
  props: {
    value: {
      required: true,
      type: [Number, String]
    },
    nullValue: {
      type: [Number, String],
      default: options.nullValue
    },
    masked: Boolean,
    reverseFill: {
      type: Boolean,
      default: options.reverseFill
    },
    prefill: {
      type: Boolean,
      default: options.prefill
    },
    precision: {
      type: Number,
      default: options.precision
    },
    minimumFractionDigits: {
      type: Number,
      default: options.minimumFractionDigits
    },
    decimal: {
      type: String,
      default: options.decimal
    },
    min: {
      type: Number,
      default: options.min
    },
    max: {
      type: Number,
      default: options.max
    },
    separator: {
      type: String,
      default: options.separator
    },
    prefix: {
      type: String,
      default: options.prefix
    },
    suffix: {
      type: String,
      default: options.suffix
    }
  },
  data() {
    return {
      maskedValue: this.value,
      unmaskedValue: this.value as Input | undefined
    }
  },
  computed: {
    emittedValue() {
      return this.masked ? this.maskedValue : this.unmaskedValue
    },
    config() {
      return {
        nullValue: this.nullValue,
        masked: this.masked,
        reverseFill: this.reverseFill,
        prefill: this.prefill,
        precision: this.precision,
        minimumFractionDigits: this.minimumFractionDigits,
        decimal: this.decimal,
        min: this.min,
        max: this.max,
        separator: this.separator,
        prefix: this.prefix,
        suffix: this.suffix
      }
    }
  },
  watch: {
    value(val) {
      if (this.unmaskedValue !== val) {
        this.maskedValue = val
      }
    }
  },
  methods: {
    input(event: Event) {
      const { target } = event as CustomInputEvent
      this.maskedValue = target.value
      this.unmaskedValue = target.unmasked
      this.$emit('input', this.emittedValue)
    },
    change() {
      this.$emit('change', this.emittedValue)
    }
  }
})
</script>

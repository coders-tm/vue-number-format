<template>
  <input
    type="text"
    autocomplete="off"
    :value="maskedValue"
    @change="change"
    @input="input"
    @blur="(evt) => $emit('blur', evt)"
    @focus="(evt) => $emit('focus', evt)"
    v-number="config"
    class="v-number"
  />
</template>

<script>
import directive from './directive'
import options from './options'

export default {
  props: {
    value: {
      required: true,
      type: [Number, String]
    },
    nullValue: {
      type: [Number, String],
      default: () => options.nullValue
    },
    masked: {
      type: Boolean,
      default: false
    },
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
      default: () => options.precision
    },
    minimumFractionDigits: {
      type: [Number, Boolean],
      default: () => options.minimumFractionDigits
    },
    decimal: {
      type: String,
      default: () => options.decimal
    },
    min: {
      type: [Number, Boolean],
      default: () => options.min
    },
    max: {
      type: [Number, Boolean],
      default: () => options.max
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
      maskedValue: this.value,
      unmaskedValue: null
    }
  },
  methods: {
    input({ target }) {
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue
      this.$emit('input', this.emittedValue)
    },
    change() {
      this.$emit('change', this.emittedValue)
    }
  },
  computed: {
    emittedValue() {
      return this.masked ? this.maskedValue : this.unmaskedValue
    },
    config() {
      const config = {}
      Object.keys(this.$props)
        .filter((item) => item !== 'value')
        .forEach((item) => {
          config[item] = this.$props[item]
        })
      return config
    }
  },
  watch: {
    value(val) {
      if (this.unmaskedValue !== val) {
        this.maskedValue = val
      }
    }
  }
}
</script>

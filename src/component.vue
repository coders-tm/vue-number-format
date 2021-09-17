<template>
  <input
    type="text"
    autocomplete="off"
    :value="maskedValue"
    @change="change"
    @input="input"
    v-number="{precision, decimal, separator, prefix, suffix}"
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
      maskedValue: this.value,
      unmaskedValue: null
    }
  },
  watch: {
    masked() {
      this.$emit('input', this.emittedValue)
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
    }
  }
}
</script>

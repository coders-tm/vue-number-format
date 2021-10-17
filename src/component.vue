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
import options from './options'

export default {
  props: {
    modelValue: {
      required: true
    },
    null_value: {
      type: [Number, String],
      default: () => options.null_value
    },
    masked: {
      type: Boolean,
      default: false
    },
    reverseFill: {
      type: Boolean,
      default: options.reverseFill
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
  emits: ['update:modelValue'],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: null
    }
  },
  watch: {
    masked() {
      this.$emit('update:modelValue', this.emittedValue)
    },
    modelValue: {
      deep: true,
      handler (val) {
        this.maskedValue = val
      }
    }
  },
  methods: {
    input({ target }) {
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue
      this.$emit('update:modelValue', this.emittedValue)
    },
    change() {
      this.$emit('update:modelValue', this.emittedValue)
    }
  },
  computed: {
    emittedValue() {
      return this.masked ? this.maskedValue : this.unmaskedValue
    },
    config() {
      return this.$props
    }
  }
}
</script>

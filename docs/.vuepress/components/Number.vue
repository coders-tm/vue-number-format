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
export default {
  name: 'Number',
  props: {
    modelValue: {
      required: true
    },
    nullValue: [Number, String],
    masked: Boolean,
    reverseFill: Boolean,
    prefill: Boolean,
    precision: Number,
    minimumFractionDigits: Number,
    decimal: String,
    min: Number,
    max: Number,
    separator: String,
    prefix: String,
    suffix: String
  },
  emits: ['update:model-value', 'input:model-value'],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: null
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
    }
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
    }
  },
  watch: {
    modelValue(val) {
      if (this.unmaskedValue !== val) {
        this.maskedValue = val
      }
    }
  }
}
</script>

import { defineComponent } from 'vue'
import { cloneDeep, CustomInputEvent, Input } from './core'
import directive from './directive'
import defaultOptions from './options'

const options = cloneDeep(defaultOptions)

export default defineComponent({
  name: 'VueNumber',
  directives: {
    number: directive
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true
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
  emits: ['update:model-value', 'input:model-value'],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: '' as Input | undefined
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
  methods: {
    input(event: CustomInputEvent) {
      const { target } = event
      this.maskedValue = target.value
      this.unmaskedValue = target.unmaskedValue
      this.$emit('input:model-value', this.emittedValue)
    },
    change() {
      this.$emit('update:model-value', this.emittedValue)
    }
  },
  template: `<input
    v-number="config"
    type="text"
    autocomplete="off"
    :value="maskedValue"
    class="v-number vue-number-format"
    @change="change"
    @input="input"
  />`
})

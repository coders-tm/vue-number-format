<template>
  <input
    v-number="config"
    type="text"
    autocomplete="off"
    :value="maskedValue"
    class="v-number vue-number-format"
    @change="change"
    @input="input"
  />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
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
      required: false,
      default: options.nullValue
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
      type: Number,
      default: () => options.minimumFractionDigits
    },
    decimal: {
      type: String,
      default: () => options.decimal
    },
    min: {
      type: Number,
      default: () => options.min
    },
    max: {
      type: Number,
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
  setup(props, { emit }) {
    const maskedValue = ref(props.modelValue)
    const unmaskedValue = ref('' as Input | undefined)
    const config = computed(() => ({ ...props }))

    const emittedValue = computed(() => {
      return props.masked ? maskedValue.value : unmaskedValue.value
    })

    const input = (event: Event) => {
      const { target } = event as CustomInputEvent
      maskedValue.value = target.value
      unmaskedValue.value = target.unmaskedValue
      emit('input:model-value', emittedValue)
    }

    const change = () => {
      emit('update:model-value', emittedValue)
    }

    return {
      config,
      maskedValue,
      input,
      change
    }
  }
})
</script>

<template>
  <input
    v-number="config"
    type="text"
    autocomplete="off"
    :value="maskedValue"
    :readonly="readonly"
    :disabled="disabled"
    class="v-number vue-number-format"
    @change="change"
    @input="input"
    @blur="blur"
  />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { cloneDeep, CustomInputEvent, Input } from './core'
import NumberFormat from './number-format'
import directive from './directive'
import defaultOptions, { Options } from './options'

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
      default: options.nullValue
    },
    masked: Boolean,
    readonly: Boolean,
    disabled: Boolean,
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
    },
    inputmode: {
      type: String,
      default: () => options.inputmode
    }
  },
  emits: ['update:model-value', 'input:model-value'],
  setup(props, { emit }) {
    const maskedValue = ref(props.modelValue)
    const canEmit = ref(false)
    const unmaskedValue = ref('' as Input | undefined)
    const config = computed(() => ({ ...props }))
    const formatNumber = new NumberFormat(config.value as Options)

    const emittedValue = computed(() => {
      if (props.masked) {
        return formatNumber.format(maskedValue.value)
      }
      return unmaskedValue.value
    })

    const input = (event: Event) => {
      const { target } = event as CustomInputEvent
      maskedValue.value = target.value
      unmaskedValue.value = target.unmasked
      canEmit.value = true
      emit('input:model-value', emittedValue.value)
    }

    const change = () => {
      emit('update:model-value', emittedValue.value)
    }

    const blur = () => {
      if (canEmit.value && emittedValue.value !== props.modelValue) {
        change()
      }
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        if (emittedValue.value !== newValue) {
          maskedValue.value = formatNumber.format(newValue)
        }
      }
    )

    return {
      config,
      maskedValue,
      unmaskedValue,
      input,
      blur,
      change
    }
  }
})
</script>

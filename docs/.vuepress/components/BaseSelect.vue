<template>
  <select
    :value="modelValue"
    class="shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50ß"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <slot>
      <option
        v-for="item in options"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </slot>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: {
      default: undefined
    },
    label: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped></style>

<template>
  <select
    :value="value"
    type="text"
    class="shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50ß"
    @input="$emit('input', $event.target.value)"
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      default: undefined,
    },
    label: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped></style>

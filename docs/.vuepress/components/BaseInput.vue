<template>
  <input
    :value="value"
    :type="type"
    class="shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped></style>

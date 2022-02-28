<template>
  <input
    :value="modelValue"
    type="text"
    class="block w-full transition-all rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      default: undefined,
    },
    label: {
      type: String,
      required: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped></style>

<template>
  <section class="mb-12 min-w-0">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xl font-medium">{{ label }}</span>
    </div>
    <div v-if="description" class="mb-3">{{ description }}</div>
    <slot />
  </section>
</template>

<script>
export default {
  name: "BaseLabel",
  props: {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped></style>

<template>
  <vue-number v-bind="config" v-model="price" />
</template>

<script>
export default {
  data() {
    return {
      price: 123456.86,
      config: {
        prefix: '$',
        // min: 0,
      }
    }
  },
}
</script>

<template>
  <div>
    <vue-number v-bind="config" v-model="price" />
    {{ price }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 123456.86,
      config: {
        prefix: '$',
        // min: 0,
        reverseFill: true
      }
    }
  },
}
</script>

<template>
  <div class="component-based">
    <div class="title">Component</div>
    <VueNumber v-bind="config" v-model="price" />
    <div>Price: {{ price }}</div>
    <div>Calculated: {{ calculated }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 123456.86,
      config: {
        min: 0,
      },
    };
  },
  watch: {
    price(val) {
      console.log("components/ComponentBased.watch:price", val);
    },
  },
  computed: {
    calculated() {
      return this.price * 10;
    },
  },
};
</script>

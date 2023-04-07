<template>
  <div class="directive-based">
    <div class="title">Directive</div>
    <input v-number="config" v-model="price" />
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
      console.log("components/DirectiveBased.watch:price", val);
    },
  },
  computed: {
    calculated() {
      return this.price * 10;
    },
  },
};
</script>

<template>
  <div class="component-based">
    <div class="title">Component</div>
    <VueNumber @input="onInput" @change="onChange" @blur="onBlur" v-bind="config" v-model="price" />
    <div>Price: {{ price }}</div>
    <div>Calculated: {{ calculated }}</div>
  </div>
</template>

<script>
import { InputMixin } from '../mixins'

export default {
  mixins:[InputMixin],
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

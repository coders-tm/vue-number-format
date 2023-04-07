<template>
  <div class="directive-based">
    <div class="title">Directive</div>
    <input @input="onInput" @change="onChange" @blur="onBlur" v-number="config" v-model="price" />
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

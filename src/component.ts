
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      message: 'Hello, World!'
    };
  },
  template: `<template>
    <div>{{ message }}</div>
  </template>`
});

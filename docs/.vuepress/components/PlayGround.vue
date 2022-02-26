<template>
  <div class="q-gutter-y-sm">
    <div class="column">
      <div class="text-h6">Component</div>
      <number
        @update:model-value="(val) => (price = val)"
        class="q-field__input"
        :model-value="price"
        v-bind="config"
      />
      <div>
        Model value: <span class="text-bold">{{ price }}</span>
      </div>
    </div>
    <div class="column">
      <div class="text-h6">Reverse Fill</div>
      <number
        @update:model-value="(val) => (price = val)"
        class="q-field__input"
        :model-value="reverseFill"
        v-bind="configReverseFill"
      />
      <div>
        Model value: <span class="text-bold">{{ reverseFill }}</span>
      </div>
    </div>
    <div class="column">
      <div class="text-h6">Directive</div>
      <input
        type="text"
        class="q-field__input"
        v-number="config"
        :value="priceDirective"
        @change="({ target }) => (priceDirective = target.value)"
      />
      <div>masking doesn't work with directive</div>
      <div>
        Model value: <span class="text-bold">{{ priceDirective }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 154.52,
      priceDirective: 6789.1,
      priceUnmasked: 6789.1,
      config: {
        decimal: ".",
        separator: ",",
        prefix: "$",
        suffix: " %",
        precision: 2,
        nullValue: "",
        masked: false,
        reverseFill: false,
      },
      reverseFill: 6789.1,
      configReverseFill: {
        reverseFill: true,
        suffix: "",
      },
    };
  },
  methods: {
    onChange(args) {
      console.log("args", args);
    },
  },
};
</script>

<template>
  <div>
    <div class="grid gap-y-4 md:grid-cols-2 md:gap-x-8 items-center my-8">
      <div class="grid">
        <div class="font-medium mb-2">Component</div>
        <VueNumber
          v-if="updated"
          v-model="price"
          v-bind="config"
          class="shadow-sm rounded-md text-base transition-all disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"
          @update:model-value="onChange"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="mt-2">
          Number value: <code class="ml-2">{{ price }}</code>
        </div>
      </div>
      <div class="grid">
        <div class="font-medium mb-2">Directive</div>
        <BaseInput
          v-if="updated"
          v-model="priceDirective"
          v-number="config"
          @change="onChange"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="mt-2">
          Value: <code class="ml-2">{{ priceDirective }}</code>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-2">
      <span class="text-2xl font-bold">Options</span>
      <div>
        <button
          class="transition-all bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-4 border border-gray-300 rounded shadow focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          @click="exportDialogVisible = true"
        >
          Export
        </button>
        <Dialog v-model="exportDialogVisible">
          <pre
            class="m-0"
            style="margin: 0"
            >{{ config }}</pre
          >
        </Dialog>
      </div>
    </div>
    <hr class="mb-8" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8">
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Separator</div>
        <BaseInput
          type="text"
          v-model="config.separator"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Decimal</div>
        <BaseInput
          type="text"
          v-model="config.decimal"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Prefix</div>
        <BaseInput
          type="text"
          v-model="config.prefix"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Suffix</div>
        <BaseInput
          type="text"
          v-model="config.suffix"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Precision</div>
        <BaseInput
          type="number"
          v-model.number="config.precision"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Null value</div>
        <BaseInput
          type="text"
          v-model="config.nullValue"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Minimum fraction digits</div>
        <BaseInput
          type="number"
          v-model.number="config.minimumFractionDigits"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Minimum value</div>
        <BaseInput
          type="number"
          v-model.number="config.min"
        />
      </div>
      <div class="mb-5 min-w-0 grid">
        <div class="mb-2 font-medium">Maximum value</div>
        <BaseInput
          type="number"
          v-model.number="config.max"
        />
      </div>
    </div>
    <div class="mb-8">
      <Checkbox
        v-model="config.masked"
        label="Masked?"
      />
      <Checkbox
        v-model="config.reverseFill"
        label="Reverse Fill?"
      />
      <Checkbox
        v-model="config.prefill"
        label="Prefill?"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updated: true,
      exportDialogVisible: false,
      price: 1234.567,
      priceDirective: 1234.567,
      config: {
        decimal: '.',
        separator: ',',
        prefix: '$',
        suffix: '',
        precision: 2,
        nullValue: '',
        masked: false,
        reverseFill: false
      }
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.updated = false
        this.$nextTick(() => {
          this.updated = true
        })
      }
    }
  },
  methods: {
    onChange() {
      console.log('onChange', arguments)
      // setTimeout(() => {
      //   this.price = 1500.629
      //   this.priceDirective = 1500.629
      // }, 3000)
    },
    onInput() {
      console.log('onInput', arguments)
    },
    onFocus() {
      console.log('onFocus', arguments)
    },
    onBlur() {
      console.log('onBlur', arguments)
    }
  }
}
</script>

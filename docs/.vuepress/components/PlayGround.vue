<template>
  <div class="row q-col-gutter-lg">
    <div class="col-sm-8 col-sx-12">
      <q-list class="q-gutter-y-sm">
        <div class="column">
          <div class="text-h6">Component</div>
          <q-field dense outlined v-model="price">
            <template
              v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
            >
              <number
                :id="id"
                class="q-field__input"
                :modelValue="modelValue"
                @update:model-value="emitValue"
                v-bind="config"
                v-show="floatingLabel"
              />
            </template>
          </q-field>
          <div>
            Model value: <span class="text-bold">{{ price }}</span>
          </div>
        </div>
        <div class="column">
          <div class="text-h6">Reverse Fill</div>
          <q-field dense outlined v-model="reverseFill">
            <template
              v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
            >
              <number
                :id="id"
                class="q-field__input"
                :modelValue="modelValue"
                @update:model-value="emitValue"
                v-bind="configReverseFill"
                v-show="floatingLabel"
              />
            </template>
          </q-field>
          <div>
            Model value: <span class="text-bold">{{ reverseFill }}</span>
          </div>
        </div>
        <div class="column">
          <div class="text-h6">Directive</div>
          <q-field dense outlined hint="masking doesn't work with directive">
            <template v-slot:control>
              <input
                type="tel"
                class="q-field__input"
                v-number="config"
                :value="priceDirective"
                @change="({ target }) => (priceDirective = target.value)"
              />
            </template>
          </q-field>
          <div>
            Model value: <span class="text-bold">{{ priceDirective }}</span>
          </div>
        </div>
      </q-list>
    </div>
    <div class="col-sm-4 col-xs-12">
      <q-list class="q-gutter-y-sm">
        <q-input dense v-model="config.prefix" type="text" label="Prefix" />
        <q-input dense v-model="config.suffix" type="text" label="Suffix" />
        <q-input
          dense
          v-model.number="config.precision"
          type="number"
          min="0"
          max="5"
          label="Precision"
        />
        <q-input dense v-model="config.decimal" type="text" label="Decimal" />
        <q-input
          dense
          v-model="config.separator"
          type="text"
          label="Separator"
        />
        <q-checkbox dense v-model="config.masked" label="Masked" />
        <q-checkbox dense v-model="config.reverseFill" label="Reverse Fill" />
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 154.52,
      priceDirective: 536.59,
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
};
</script>

<style lang="css">
.container {
  min-width: 800px;
  max-width: 95vw;
}
</style>

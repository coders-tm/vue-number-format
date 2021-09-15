<template>
  <div class="row q-col-gutter-lg">
    <div class="col-sm-8 col-sx-12">
      <q-list :dark="false" class="q-gutter-y-sm">
        <div class="column">
          <div class="text-h6">Component</div>
          <q-field
            :dark="false"
            dense
            outlined
          >
            <template v-slot:control>
              <number
                class="q-field__input"
                v-model="price"
                v-bind="config"
              />
            </template>
          </q-field>
          <div>Model value: <span class="text-bold">{{price}}</span></div>
        </div>
        <div class="column">
          <div class="text-h6">Directive</div>
          <q-field
            :dark="false"
            dense
            outlined
            hint="masking doesn't work with directive"
          >
            <template v-slot:control>
              <input
                type="tel"
                class="q-field__input"
                v-number="config"
                v-model="priceDirective"
              />
            </template>
          </q-field>
          <div>Model value: <span class="text-bold">{{priceDirective}}</span></div>
        </div>
        <div class="column">
          <div class="text-h6">Directive on Custom Component of <a href="https://quasar.dev/vue-components/input" target="_blank">QInput</a></div>
          <q-input
            :dark="false"
            dense
            outlined
            v-model="priceUnmasked"
            v-number="config"
          />
          <div>Model value: <span class="text-bold">{{priceUnmasked}}</span></div>
        </div>
      </q-list>
    </div>
    <div class="col-sm-4 col-sx-12">
      <q-list :dark="false" class="q-gutter-y-sm">
        <q-input :dark="false" dense v-model="config.prefix" type="text" label="Prefix" />
        <q-input :dark="false" dense v-model="config.suffix" type="text" label="Suffix" />
        <q-input :dark="false" dense v-model.number="config.precision" type="number" min="0" max="5" label="Precision" />
        <q-input :dark="false" dense v-model="config.decimal" type="text" label="Decimal" />
        <q-input :dark="false" dense v-model="config.separator" type="text" label="Separator" />
        <q-checkbox :dark="false" dense v-model="config.masked" label="Masked" />
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      price: 154.52,
      priceDirective: 5432.1,
      priceUnmasked: 6789.10,
      config: {
        decimal: ',',
        separator: '.',
        prefix: '$',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  methods: {
    change (evt) {
      console.log('change', evt.target.value);
    }
  }
}
</script>

<style lang="css">
    .container {
        min-width: 800px;
        max-width: 95vw;
    }
</style>

# Integration

## Quasar

The QNumber component is used to capture number input from the user. It uses v-model, similar to a regular input. It has support for errors and validation, and comes in a variety of styles, colors, and types.

### Install
```bash
quasar ext add qnumber
```
Quasar CLI will retrieve it from the NPM registry and install the extension to your project.

### Example

```html
<q-number
    v-model="modelValue"
    @update:model-value="onChange"

    <!-- options: https://vue-number-format.netlify.app/guide/config.html -->
    :options="{
        prefix: '$',
        suffix: '',
        separator: ',',
        decimal: '.',
        precision: 2,
        prefill: true,
        reverseFill: false,
        min: false,
        max: false,
        nullValue: ''
    }"
/>
```

### Uninstall
```bash
quasar ext remove qnumber
```

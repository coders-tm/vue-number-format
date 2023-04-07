export const InputMixin = {
  methods: {
    onChange() {
      console.log('onChange', arguments)
    },
    onInput() {
      console.log('onInput', arguments)
    },
    onBlur() {
      console.log('onBlur', arguments)
    }
  }
}

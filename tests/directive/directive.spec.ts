import { mount } from '@vue/test-utils'
import directive from '../../src/directive'

describe('v-number directive', () => {
  it('should emit input event with the new value on input', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: '',
          options: {}
        }
      }
    })

    const input = wrapper.find('input')

    input.element.value = '1234'
    await input.trigger('input')
    expect(input.element.value).toBe('1,234')

    input.element.value = '1234.529'
    await input.trigger('input')
    expect(input.element.value).toBe('1,234.529')

    await input.trigger('blur')
    expect(input.element.value).toBe('1,234.53')
  })
})

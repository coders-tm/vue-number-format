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
          value: '1234.536',
          options: {}
        }
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,234.54')

    input.element.value = '1234.529'
    await input.trigger('input')
    expect(input.element.value).toBe('1,234.529')

    await input.trigger('blur')
    expect(input.element.value).toBe('1,234.53')
    expect(input.element.oldValue).toBe('1,234.53')
  })
})

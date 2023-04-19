import { mount } from '@vue/test-utils'
import { directive } from '../../src'

describe('v-number directive', () => {
  it('should emit input event with the new value on input', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" :value="value" />`,
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
    input.setValue('1234')
    expect(input.element.value).toBe('1,234')

    input.setValue('1234.529')
    expect(input.element.value).toBe('1,234.529')

    await input.trigger('blur')
    expect(input.element.value).toBe('1,234.53')
  })
})

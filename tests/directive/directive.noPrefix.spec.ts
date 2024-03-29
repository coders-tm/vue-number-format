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
          value: 123456.893,
          options: {
            decimal: ',',
            separator: '.'
          }
        }
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123.456,89')

    await input.trigger('blur')
    expect(input.element.value).toBe('123.456,89')

    input.setValue('1234,568')
    expect(input.element.value).toBe('1.234,568')

    await input.trigger('blur')
    expect(input.element.value).toBe('1.234,57')
  })
})

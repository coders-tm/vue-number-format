import { mount } from '@vue/test-utils'
import { directive } from '../../src'

describe('v-number directive', () => {
  it('should emit input event with the new value on input', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: 123456.893,
          options: {
            decimal: ',',
            separator: '.',
            prefix: 'Rs.',
            suffix: '%'
          }
        }
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Rs.123.456,89%')

    await input.trigger('blur')
    expect(input.element.value).toBe('Rs.123.456,89%')

    input.element.value = 1234.568
    await input.trigger('input')
    expect(input.element.value).toBe('Rs.1.234,568%')

    await input.trigger('blur')
    expect(input.element.value).toBe('Rs.1.234,57%')
  })
})

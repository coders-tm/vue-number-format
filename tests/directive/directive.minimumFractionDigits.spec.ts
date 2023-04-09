import { mount } from '@vue/test-utils'
import directive from '../../src/directive'

describe('v-number directive', () => {
  test('should emit input event with minimum fraction digits', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: 123456.893,
          options: {
            minimumFractionDigits: 2
          }
        }
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(input.element.value).toBe('123,456.893')

    await input.trigger('blur')

    expect(input.element.value).toBe('123,456.89')

    input.element.value = '1234.5'

    await input.trigger('input')

    expect(input.element.value).toBe('1,234.5')

    await input.trigger('blur')

    expect(input.element.value).toBe('1,234.50')
  })
})

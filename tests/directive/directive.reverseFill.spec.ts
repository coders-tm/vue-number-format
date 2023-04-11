import { mount } from '@vue/test-utils'
import directive from '../../src/directive'

describe('v-number directive', () => {
  it('should emit input event with reverse fill', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: 1234.5,
          options: {
            reverseFill: true
          }
        }
      }
    })

    const input = wrapper.find('input')
    await input.trigger('input')
    expect(input.element.value).toBe('1,234.50')

    input.element.value = '1234.529'
    await input.trigger('input')
    expect(input.element.value).toBe('12,345.29')

    await input.trigger('blur')
    expect(input.element.value).toBe('12,345.29')
  })
})

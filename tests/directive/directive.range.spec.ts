import { mount } from '@vue/test-utils'
import { directive } from '../../src'

describe('v-number directive', () => {
  it('should emit input event within range', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: 1234.53,
          options: {
            min: 0,
            max: 2000
          }
        }
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,234.53')

    input.element.value = '2234.529'
    await input.trigger('blur')
    expect(input.element.value).toBe('2,000')

    input.element.value = '-1234.568'
    await input.trigger('blur')
    expect(input.element.value).toBe('0')

    input.element.value = '1234.568'
    await input.trigger('blur')
    expect(input.element.value).toBe('1,234.57')
  })
})

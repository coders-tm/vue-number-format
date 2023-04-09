import { mount } from '@vue/test-utils'
import directive from '../../src/directive'

describe('v-number directive', () => {
  it('should emit input event within range', async () => {
    const wrapper = mount({
      template: `<input v-number="options" type="text" v-model="value" />`,
      directives: {
        number: directive
      },
      data() {
        return {
          value: 1.53,
          options: {
            min: 0,
            max: 50
          }
        }
      }
    })

    const input = wrapper.find('input')
    await input.trigger('input')

    expect(input.element.value).toBe('1.53')

    input.element.value = '1234.529'
    await input.trigger('blur')

    expect(input.element.value).toBe('50')

    input.element.value = '-1234.568'

    await input.trigger('blur')

    expect(input.element.value).toBe('0')

    input.element.value = '12.568'

    await input.trigger('blur')

    expect(input.element.value).toBe('12.57')
  })
})

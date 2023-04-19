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
          value: '1234.536',
          options: {
            precision: 0
          }
        }
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,235')

    input.element.value = '1234.529'
    await input.trigger('input')
    expect(input.element.value).toBe('1,235')

    await input.trigger('blur')
    expect(input.element.value).toBe('1,235')
    expect(input.element.oldValue).toBe('1,235')
  })
})

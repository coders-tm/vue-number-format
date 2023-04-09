import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber', () => {
  test('should emit input event with the new value on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        decimal: ',',
        separator: '.',
        prefix: 'Rs.',
        suffix: '%'
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('Rs.123.456,893%')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('Rs.123.456,89%')

    input.element.value = 1234.568

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('Rs.1.234,568%')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('Rs.1.234,57%')
  })
})

import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber with minimum fraction digits', () => {
  test('should emit input event with the new maskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        minimumFractionDigits: 2
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('123,456.893')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('123,456.89')

    input.element.value = '1234.5'

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('1,234.5')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,234.50')
  })

  test('should emit input event with the new unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        minimumFractionDigits: 2
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.vm.unmaskedValue).toBe('123456.89')

    await input.trigger('blur')

    expect(wrapper.vm.unmaskedValue).toBe('123456.89')

    input.element.value = '1234.5'

    await input.trigger('input')

    expect(wrapper.vm.unmaskedValue).toBe('1234.5')

    await input.trigger('blur')

    expect(wrapper.vm.unmaskedValue).toBe('1234.5')
  })
})

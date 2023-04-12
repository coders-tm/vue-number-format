import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber with minimum fraction digits', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        minimumFractionDigits: 2
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123,456.89')

    input.element.value = '123456.893'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('123,456.893')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('123,456.89')

    input.element.value = '1234.509'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234.51')
    expect(wrapper.vm.maskedValue).toBe('1,234.509')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.51')
    expect(wrapper.vm.maskedValue).toBe('1,234.51')
  })
})

import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber reverse fill', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        reverseFill: true
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123,456.89')

    input.element.value = 123456.893
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234568.93')
    expect(wrapper.vm.maskedValue).toBe('1,234,568.93')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234568.93')
    expect(wrapper.vm.maskedValue).toBe('1,234,568.93')

    input.element.value = '1234568'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('12345.68')
    expect(wrapper.vm.maskedValue).toBe('12,345.68')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('12345.68')
    expect(wrapper.vm.maskedValue).toBe('12,345.68')
  })
})

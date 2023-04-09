import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber reverse fill', () => {
  test('should emit input event with the new maskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        reverseFill: true
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('123,456.89')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('123,456.89')

    input.element.value = '1234568'

    await input.trigger('input')

    expect(wrapper.vm.maskedValue).toBe('12,345.68')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('12,345.68')
  })

  test('should emit input event with the new unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        reverseFill: true
      }
    })

    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.vm.unmaskedValue).toBe('123456.89')

    await input.trigger('blur')

    expect(wrapper.vm.unmaskedValue).toBe('123456.89')

    input.element.value = '1234568'

    await input.trigger('input')

    expect(wrapper.vm.unmaskedValue).toBe('12345.68')

    await input.trigger('blur')

    expect(wrapper.vm.unmaskedValue).toBe('12345.68')
  })
})

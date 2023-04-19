import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber within range', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 1234.893,
        min: 0,
        max: 2000
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,234.89')

    input.element.value = 1238.893
    await input.trigger('input')
    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1238.89')
    expect(wrapper.vm.maskedValue).toBe('1,238.89')

    input.element.value = '1234.568'
    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('1,234.57')

    input.element.value = '-1234.568'
    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('0')
    expect(wrapper.vm.maskedValue).toBe('0')
  })
})

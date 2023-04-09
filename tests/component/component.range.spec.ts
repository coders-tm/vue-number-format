import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber', () => {
  test('should emit input event within range', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 1.893,
        min: 0,
        max: 50
      }
    })

    const input = wrapper.find('input')

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1.89')

    input.element.value = '1234.568'

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('50')

    input.element.value = '-1234.568'

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('0')

    input.element.value = '12.568'

    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('12.57')
  })
})

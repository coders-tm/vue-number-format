import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber custom config', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        decimal: ',',
        separator: '.',
        prefix: '',
        suffix: '%'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123.456,89%')

    input.element.value = '123.456'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123456')
    expect(wrapper.vm.maskedValue).toBe('123.456%')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123456')
    expect(wrapper.vm.maskedValue).toBe('123.456%')

    input.element.value = '1234,568'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('1.234,568%')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('1.234,57%')
  })
})

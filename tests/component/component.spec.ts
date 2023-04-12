import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber', () => {
  it('renders an input element', () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: '123'
      }
    })
    expect(wrapper.contains('input')).toBe(true)
  })

  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123,456.89')

    input.element.value = 123456.893
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('123,456.893')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('123,456.89')

    input.element.value = '1234.568'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('1,234.568')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('1,234.57')
  })
})

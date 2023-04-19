import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('renders an input element', () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: '123',
        precision: 0
      }
    })
    expect(wrapper.contains('input')).toBe(true)
  })

  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        precision: 0
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123,457')

    input.element.value = 123457.89
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123458')
    expect(wrapper.vm.maskedValue).toBe('123,458')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123458')
    expect(wrapper.vm.maskedValue).toBe('123,458')

    input.element.value = '1234.568'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1235')
    expect(wrapper.vm.maskedValue).toBe('1,235')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1235')
    expect(wrapper.vm.maskedValue).toBe('1,235')
  })
})

import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber with minimum fraction digits', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        precision: 3,
        minimumFractionDigits: 2
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('123,456.893')

    input.element.value = '123457.893'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123457.893')
    expect(wrapper.vm.maskedValue).toBe('123,457.893')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123457.893')
    expect(wrapper.vm.maskedValue).toBe('123,457.893')

    input.element.value = '1234.5'
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234.5')
    expect(wrapper.vm.maskedValue).toBe('1,234.5')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.5')
    expect(wrapper.vm.maskedValue).toBe('1,234.50')
  })
})

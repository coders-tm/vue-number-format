import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber custom config', () => {
  test('should emit input event with the new maskedValue and unmaskedValue on input', async () => {
    const wrapper = mount(VueNumber, {
      propsData: {
        value: 123456.893,
        decimal: ',',
        separator: '.',
        prefix: 'Rs.',
        suffix: '%'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Rs.123.456,89%')

    input.element.value = 123456.893
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('Rs.123.456,893%')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('123456.89')
    expect(wrapper.vm.maskedValue).toBe('Rs.123.456,89%')

    input.element.value = 1234.568
    await input.trigger('input')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('Rs.1.234,568%')

    await input.trigger('blur')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.vm.maskedValue).toBe('Rs.1.234,57%')
  })
})

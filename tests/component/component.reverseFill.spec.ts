import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('renders the correct maskedValue when reverseFill prop is true', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        reverseFill: true
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000.00')

    input.setValue('1234.505')

    expect(input.element.value).toBe('12,345.05')
    expect(wrapper.vm.maskedValue).toBe('12,345.05')
    expect(wrapper.vm.unmaskedValue).toBe('12345.05')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['12345.05'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['12345.05'])

    input.setValue('1234.00')

    expect(input.element.value).toBe('1,234.00')
    expect(wrapper.vm.maskedValue).toBe('1,234.00')
    expect(wrapper.vm.unmaskedValue).toBe('1234')
    expect(wrapper.emitted()['input:model-value'][1]).toEqual(['1234'])
    expect(wrapper.emitted()['update:model-value'][1]).toEqual(['1234'])
  })
})

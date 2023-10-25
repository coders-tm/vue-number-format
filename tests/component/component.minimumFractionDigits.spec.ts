import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('renders the correct maskedValue when minimumFractionDigits', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        minimumFractionDigits: 1
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000.0')

    input.setValue('1234.505')
    expect(input.element.value).toBe('1,234.505')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,234.51')
    expect(wrapper.vm.unmaskedValue).toBe('1234.51')
    expect(wrapper.emitted()['input:model-value'][1]).toEqual(['1234.51'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1234.51'])

    input.setValue('1234')
    expect(input.element.value).toBe('1,234')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,234.0')
    expect(wrapper.vm.unmaskedValue).toBe('1234.0')
    expect(wrapper.emitted()['input:model-value'][2]).toEqual(['1234.0'])
    expect(wrapper.emitted()['update:model-value'][2]).toEqual(['1234.0'])
  })
})

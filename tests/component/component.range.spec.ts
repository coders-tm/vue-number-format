import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('renders the correct maskedValue and unmaskedValue when min and max prop added', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        min: 0,
        max: 5000
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000')

    input.setValue('-100.52')
    await input.trigger('blur')
    await input.trigger('change')

    expect(wrapper.vm.maskedValue).toBe('0')
    expect(wrapper.vm.unmaskedValue).toBe('0')
    expect(wrapper.emitted()['input:model-value'][1]).toEqual(['0'])
    expect(wrapper.emitted()['update:model-value'][1]).toEqual(['0'])

    input.setValue('10000.52')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('5,000')
    expect(wrapper.vm.unmaskedValue).toBe('5000')
    expect(wrapper.emitted()['input:model-value'][3]).toEqual(['5000'])
    expect(wrapper.emitted()['update:model-value'][4]).toEqual(['5000'])

    input.setValue('1325.259')
    await input.trigger('blur')

    expect(input.element.value).toBe('1,325.26')
    expect(wrapper.vm.maskedValue).toBe('1,325.26')
    expect(wrapper.vm.unmaskedValue).toBe('1325.26')
    expect(wrapper.emitted()['update:model-value'][6]).toEqual(['1325.26'])
    expect(wrapper.emitted()['input:model-value'][4]).toEqual(['1325.26'])
  })
})

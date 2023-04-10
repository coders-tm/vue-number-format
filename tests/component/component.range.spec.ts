import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

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
    wrapper.setProps({ modelValue: '-100.52' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('0')
    expect(wrapper.vm.maskedValue).toBe('0')
    expect(wrapper.vm.unmaskedValue).toBe('0')
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['0'])
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['0'])

    wrapper.setProps({ modelValue: '10000.52' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('5,000')
    expect(wrapper.vm.maskedValue).toBe('5,000')
    expect(wrapper.vm.unmaskedValue).toBe('5000')
    expect(wrapper.emitted()['update:model-value'][1]).toEqual(['5000'])
    expect(wrapper.emitted()['input:model-value'][1]).toEqual(['5000'])

    wrapper.setProps({ modelValue: '1325.259' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('1,325.26')
    expect(wrapper.vm.maskedValue).toBe('1,325.26')
    expect(wrapper.vm.unmaskedValue).toBe('1325.26')
    expect(wrapper.emitted()['update:model-value'][2]).toEqual(['1325.26'])
    expect(wrapper.emitted()['input:model-value'][2]).toEqual(['1325.26'])
  })
})

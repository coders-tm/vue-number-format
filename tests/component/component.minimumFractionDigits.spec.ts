import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

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
    wrapper.setProps({ modelValue: '1234.505' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('1,234.51')
    expect(wrapper.vm.maskedValue).toBe('1,234.51')
    expect(wrapper.vm.unmaskedValue).toBe('1234.51')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1234.51'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1234.51'])

    wrapper.setProps({ modelValue: '1234' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('1,234.0')
    expect(wrapper.vm.maskedValue).toBe('1,234.0')
    expect(wrapper.vm.unmaskedValue).toBe('1234')
    expect(wrapper.emitted()['input:model-value'][1]).toEqual(['1234'])
    expect(wrapper.emitted()['update:model-value'][1]).toEqual(['1234'])
  })
})

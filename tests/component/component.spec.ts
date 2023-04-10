import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber', () => {
  it('updates the maskedValue when input is changed', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000.53
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000.53')
    input.setValue('1234.5')

    expect(wrapper.vm.maskedValue).toBe('1,234.5')
    expect(wrapper.vm.unmaskedValue).toBe('1234.5')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1234.5'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1234.5'])
  })

  it('renders the correct maskedValue when masked prop is true', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        masked: true
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000')
    input.setValue('1234.5')

    expect(wrapper.vm.maskedValue).toBe('1,234.5')
    expect(wrapper.vm.unmaskedValue).toBe('1234.5')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1,234.5'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1,234.5'])
  })
})

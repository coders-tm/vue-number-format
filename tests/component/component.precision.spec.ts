import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('updates the maskedValue when input is changed', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000.53,
        precision: 0
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,001')
    input.setValue('1234.5')

    expect(wrapper.vm.maskedValue).toBe('1,235')
    expect(wrapper.vm.unmaskedValue).toBe('1235')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1235'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1235'])
  })

  it('renders the correct maskedValue when masked prop is true', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        masked: true,
        precision: 0
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000')

    input.setValue('1234.5')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,235')
    expect(wrapper.vm.unmaskedValue).toBe('1235')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1,235'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1,235'])
  })
})

import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('updates the maskedValue when input is changed', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000.53
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000.53')

    input.setValue('1234.537')
    expect(input.element.value).toBe('1,234.537')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,234.54')
    expect(wrapper.vm.unmaskedValue).toBe('1234.54')
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1234.54'])
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1234.54'])
  })
})

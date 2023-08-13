import { mount } from '@vue/test-utils'
import { component as VueNumber } from '../../src'

describe('VueNumber', () => {
  it('renders the correct maskedValue when masked prop is true', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 1000,
        masked: true
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('1,000')

    input.setValue('1234.567')
    expect(input.element.value).toBe('1,234.567')
    await input.trigger('blur')

    expect(wrapper.vm.maskedValue).toBe('1,234.57')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1,234.57'])
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1,234.57'])
  })
})

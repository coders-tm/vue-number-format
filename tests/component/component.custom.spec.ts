import { mount } from '@vue/test-utils'
import VueNumber from '../../src/component.vue'

describe('VueNumber', () => {
  it('renders the correct maskedValue and unmaskedValue when custom config', async () => {
    const wrapper = mount(VueNumber, {
      props: {
        modelValue: 123456.893,
        decimal: ',',
        separator: '.',
        prefix: 'Rs.',
        suffix: '%'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Rs.123.456,89%')
    wrapper.setProps({ modelValue: '1234.568' })
    await input.trigger('input')
    await input.trigger('change')

    expect(input.element.value).toBe('Rs.1.234,57%')
    expect(wrapper.vm.maskedValue).toBe('Rs.1.234,57%')
    expect(wrapper.vm.unmaskedValue).toBe('1234.57')
    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1234.57'])
    expect(wrapper.emitted()['input:model-value'][0]).toEqual(['1234.57'])
  })
})

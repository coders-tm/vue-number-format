import { mount } from '@vue/test-utils'
import Component from '../src/component.vue'

test('test component', async () => {
  expect(Component).toBeTruthy()

  const wrapper = mount(Component, {
    propsData: {
      value: '458.869',
      onChange: (e: Event) => wrapper.setProps({ value: e })
    }
  })

  expect(wrapper.vm.value).toBe('458.869')

  // await wrapper.find('input').setValue('125.00')
  // expect(wrapper.props('value')).toBe('125')
})

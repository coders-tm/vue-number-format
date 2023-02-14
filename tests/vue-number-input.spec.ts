import { shallowMount } from '@vue/test-utils'
import Component from '../src/component'

test('test component', async () => {
  expect(Component).toBeTruthy()

  const wrapper = shallowMount(Component, {
    props: {
      modelValue: '458.869',
      'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e })
    }
  })

  expect(wrapper.vm.modelValue).toBe('458.869')

  // await wrapper.find('input').setValue('125.00')
  // expect(wrapper.props('modelValue')).toBe('125')
})

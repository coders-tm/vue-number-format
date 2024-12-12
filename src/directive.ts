import { DirectiveBinding, VNode } from 'vue'
import * as core from './core'
import defaultOptions from './options'
import NumberFormat from './number-format'

export default {
  beforeMount: (el: core.CustomInputElement, { value, modifiers }: DirectiveBinding, vnode: VNode) => {
    el = core.getInputElement(el)
    const options = Object.assign(core.cloneDeep(defaultOptions), value, modifiers)
    const { reverseFill, precision, decimal, inputmode } = options
    el.options = options
    el.setAttribute('inputmode', inputmode)
    if (reverseFill && el.value) {
      el.value = parseFloat(new NumberFormat({ ...options, reverseFill: false }).unformat(el.value)).toFixed(precision)
      if (vnode?.props?.value) {
        vnode.props.value = el.value
      }
    } else if (el.value && !isNaN(Number(el.value))) {
      el.value = el.value.replace('.', decimal)
    }
    // set initial value
    core.updateValue(el, vnode, { force: options.prefill, clean: true, emit: false })
  },

  mounted: (el: core.CustomInputElement) => {
    el = core.getInputElement(el)

    // prefer adding event listener to parent element to avoid Firefox bug which does not
    // execute `useCapture: true` event handlers before non-capturing event handlers
    const handlerOwner = el.parentElement || el

    // use anonymous event handler to avoid inadvertently removing masking for all inputs within a container
    const oninput = (e: Event) => {
      if (e.target !== el) {
        return
      }
      core.inputHandler(e as core.CustomInputEvent)
    }

    const onblur = (e: Event) => {
      if (e.target !== el) {
        return
      }
      core.blurHandler(e as core.CustomInputEvent)
    }

    // check decimal key and insert to current element
    // updated cursor position after format the value
    const onkeydown = (e: Event) => {
      if (e.target !== el) {
        return
      }
      core.keydownHandler(e as KeyboardEvent, el)
    }

    handlerOwner.addEventListener('input', oninput, true)
    handlerOwner.addEventListener('blur', onblur, true)
    handlerOwner.addEventListener('keydown', onkeydown, true)

    el.cleanup = () => {
      handlerOwner.removeEventListener('input', oninput, true)
      handlerOwner.removeEventListener('blur', onblur, true)
      handlerOwner.removeEventListener('keydown', onkeydown, true)
    }
  },

  updated: (el: core.CustomInputElement, { value, oldValue, modifiers }: DirectiveBinding, vnode: VNode) => {
    el = core.getInputElement(el)
    if (value !== oldValue) {
      const options = el.options
      el.options = Object.assign(options, value, modifiers)
      core.updateValue(el, vnode, { force: true, clean: false, emit: false })
    } else {
      core.updateValue(el, vnode, { emit: false })
    }
  },

  unmounted: (el: core.CustomInputElement) => {
    core.getInputElement(el).cleanup()
  }
}

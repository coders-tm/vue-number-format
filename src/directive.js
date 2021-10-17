import * as core from './core'
import defaults from './options'

const CONFIG_KEY = core.CONFIG_KEY

export default {
  beforeMount: (el, { value, modifiers }, vnode) => {
    el = core.getInputElement(el)
    const config = Object.assign({}, defaults, value, modifiers)
    el[CONFIG_KEY] = { config }
    // set initial value
    core.updateValue(el, vnode, { force: config.prefill, clean: true })
  },

  mounted: (el) => {
    el = core.getInputElement(el)
    const option = el[CONFIG_KEY]
    const { config } = option
    // prefer adding event listener to parent element to avoid Firefox bug which does not
    // execute `useCapture: true` event handlers before non-capturing event handlers
    const handlerOwner = el.parentElement || el

    // use anonymous event handler to avoid inadvertently removing masking for all inputs within a container
    const oninput = (e) => core.inputHandler(e)

    handlerOwner.addEventListener('input', oninput, true)

    el.onblur = (e) => core.blurHandler(e)

    // check decimal key and insert to current element
    // updated cursor position after format the value
    el.onkeydown = (e) => {
      if (([110, 190].includes(e.keyCode) || e.key === config.decimal) && !el.value.includes(config.decimal)) {
        e.preventDefault()
        el.setRangeText(config.decimal)
        el.dispatchEvent(new Event('input'))
        core.updateCursor(el, el.value.indexOf(config.decimal) + 1)
      } else if (([110, 190].includes(e.keyCode) || e.key === config.decimal) && el.value.includes(config.decimal)) {
        e.preventDefault()
      }
    }

    option.cleanup = () => handlerOwner.removeEventListener('input', oninput, true)
  },

  updated: (el, { value, oldValue, modifiers }, vnode) => {
    el = core.getInputElement(el)
    if (value !== oldValue) {
      const { config } = el[CONFIG_KEY]
      el[CONFIG_KEY].config = Object.assign({}, config, value, modifiers)
      core.updateValue(el, vnode, { force: true })
    } else {
      core.updateValue(el, vnode)
    }
  },

  unmounted: (el) => {
    core.getInputElement(el)[CONFIG_KEY].cleanup()
  }
}

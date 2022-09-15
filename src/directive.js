/* eslint-disable prefer-object-spread */
import * as core from './core'
import defaults from './options'

const CONFIG_KEY = core.CONFIG_KEY

export default {
  bind: (el, { value, modifiers }, vnode) => {
    el = core.getInputElement(el)
    const config = Object.assign({}, core.cloneDeep(defaults), value, modifiers)
    el[CONFIG_KEY] = { config }
    // set initial value
    core.updateValue(el, vnode, { force: config.prefill, clean: true })
  },

  inserted: (el) => {
    el = core.getInputElement(el)
    const option = el[CONFIG_KEY]
    const { config } = option
    // prefer adding event listener to parent element to avoid Firefox bug which does not
    // execute `useCapture: true` event handlers before non-capturing event handlers
    const handlerOwner = el.parentElement || el

    // use anonymous event handler to avoid inadvertently removing masking for all inputs within a container
    const oninput = (e) => {
      if (e.target !== el) {
        return
      }
      core.inputHandler(e)
    }

    handlerOwner.addEventListener('input', oninput, true)

    el.onblur = (e) => core.blurHandler(e)

    // check decimal key and insert to current element
    // updated cursor position after format the value
    el.onkeydown = (e) => {
      if (
        ([110, 190].includes(e.keyCode) || e.key === config.decimal) && el.value.includes(config.decimal)
      ) {
        e.preventDefault()
      } else if ([8].includes(e.keyCode)) {
        // check current cursor position is after separator when backspace key down
        const character = el.value.slice(el.selectionEnd - 1, el.selectionEnd)
        const replace = el.value.slice(el.selectionEnd - 2, el.selectionEnd)
        if (character === config.separator) {
          e.preventDefault()

          let positionFromEnd = el.value.length - el.selectionEnd
          // remove separator and before character
          el.value = el.value.replace(replace, '')
          // updated cursor position
          positionFromEnd = Math.max(positionFromEnd, config.suffix.length)
          positionFromEnd = el.value.length - positionFromEnd
          positionFromEnd = Math.max(positionFromEnd, config.prefix.length)
          core.updateCursor(el, positionFromEnd)
          // trigger input event
          el.dispatchEvent(new Event('input'))
        }
      }
    }

    option.cleanup = () => handlerOwner.removeEventListener('input', oninput, true)
  },

  update: (el, { value, oldValue, modifiers }, vnode) => {
    el = core.getInputElement(el)
    if (value !== oldValue) {
      const { config } = el[CONFIG_KEY]
      el[CONFIG_KEY].config = Object.assign({}, config, value, modifiers)
      core.updateValue(el, vnode, { force: true, clean: true })
    } else {
      core.updateValue(el, vnode)
    }
  },

  unbind: (el) => {
    core.getInputElement(el)[CONFIG_KEY].cleanup()
  }
}

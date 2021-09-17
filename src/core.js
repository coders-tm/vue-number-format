import NumberFormat from './number-format'
import options from './options'

export const CONFIG_KEY = '__input-number-format__'
/**
 * Creates a CustomEvent('input') with detail = { facade: true }
 * used as a way to identify our own input event
 */
export function FacadeInputEvent() {
  return new CustomEvent('input', {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  })
}

/**
 * Transform an array or string config into an object
 *
 * @param {Object} config The mask config object
 * @param {Object} modifiers An object of modifier flags that can influence the masking process
 */
export function normalizeConfig(config) {
  return Object.assign(options, config)
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 *
 * @param {HTMLInputElement} el
 */
export function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input')

  /* istanbul ignore next */
  if (!inputElement) {
    throw new Error('facade directive requires an input element')
  }

  return inputElement
}

/**
 * Updates the cursor position to the right place after the masking rule was applied
 * @param {HTMLElement} el
 * @param {Number} position
 */
export function updateCursor(el, position) {
  const config = el[CONFIG_KEY] && el[CONFIG_KEY].config
  position = Math.max(position, config.suffix.length)
  position = el.value.length - position
  position = Math.max(position, config.prefix.length + 1)
  const setSelectionRange = () => { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    // Android Fix
    setTimeout(setSelectionRange, 1)
  }
}

/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {HTMLInputElement} el The input element to update
 * @param {object} [options]
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 */
export function updateValue(el, vnode, { emit = true, force = false } = {}) {
  const { config } = el[CONFIG_KEY]
  let { oldValue } = el[CONFIG_KEY]

  let currentValue = vnode && vnode.data.model ? vnode.data.model.value : el.value

  oldValue = oldValue || ''
  currentValue = currentValue || ''

  if (force || oldValue !== currentValue) {
    const number = new NumberFormat(config)
    const masked = number.format(currentValue)
    const unmasked = number.unformat(currentValue)

    el[CONFIG_KEY].oldValue = masked
    el.unmaskedValue = unmasked

    // safari makes the cursor jump to the end if el.value gets assign even if to the same value
    if (el.value !== masked) {
      el.value = masked
    }

    // this part needs to be outside the above IF statement for vuetify in firefox
    // drawback is that we endup with two's input events in firefox
    return emit && el.dispatchEvent(FacadeInputEvent())
  }
}

/**
 * Input event handler
 *
 * @param {Event} event The event object
 */
export function inputHandler(event) {
  const { target, detail } = event
  // We dont need to run this method on the event we emit (prevent event loop)
  if (detail && detail.facade) {
    return false
  }

  // since we will be emitting our own custom input event
  // we can stop propagation of this native event
  event.stopPropagation()

  const positionFromEnd = target.value.length - target.selectionEnd
  const { oldValue } = target[CONFIG_KEY]

  updateValue(target, null, { emit: false }, event)
  updateCursor(target, positionFromEnd)

  if (oldValue !== target.value) {
    target.dispatchEvent(FacadeInputEvent())
  }
}

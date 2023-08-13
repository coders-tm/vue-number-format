import { VNode } from 'vue'
import NumberFormat from './number-format'

export const MINUS = '-'

export type Input = number | string

export interface Options {
  prefix: string
  suffix: string
  separator: string
  decimal: string
  precision: number
  minimumFractionDigits: number
  prefill: boolean
  reverseFill: boolean
  min?: number
  max?: number
  nullValue: string
}

export interface Config {
  options: Options
  oldValue: Input
  masked: Input
  unmasked: Input
}

export class CustomInputEvent<T = any> extends CustomEvent<T> {
  target!: CustomInputElement
}
export interface CustomInputElement extends HTMLInputElement {
  options: Options
  masked?: Input
  unmasked?: Input
  oldValue?: Input
  cleanup: () => void
}

/**
 * Creates a fuction to clone the objcet
 */
export function cloneDeep(data: object) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * Creates a CustomEvent with detail = { facade: true }
 * used as a way to identify our own event
 */
export function InputEvent(event: string) {
  return new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  })
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 */
export function getInputElement(el: HTMLElement | HTMLInputElement): CustomInputElement {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector<HTMLInputElement>('input')

  /* istanbul ignore next */
  if (!inputElement) {
    throw new Error('number directive requires an input element')
  }

  return inputElement as CustomInputElement
}

/**
 * Updates the cursor position to the right place after the masking rule was applied
 */
export function updateCursor(el: HTMLInputElement, position: number) {
  const setSelectionRange = (): any => {
    el.setSelectionRange(position, position)
  }
  setSelectionRange()
  // Android Fix
  setTimeout(setSelectionRange, 1)
}

/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {CustomInputElement} el The input element to update
 * @param {object} [options]
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 */
export function updateValue(el: CustomInputElement, vnode: VNode | null, { emit = true, force = false, clean = false } = {}) {
  // console.log('updateValue', arguments)

  const { options, oldValue } = el
  const { reverseFill, max, min } = options
  const currentValue = vnode?.props?.value || el.value

  if (force || oldValue !== currentValue) {
    const number = new NumberFormat(options).clean(clean && !reverseFill)
    let masked = number.format(currentValue)
    let unmasked = number.clean(!reverseFill).unformat(currentValue)

    // check value with in range max and min value
    if (clean) {
      if (Number(max) === max && Number(unmasked) > max) {
        masked = number.format(max)
        unmasked = max.toString()
      } else if (Number(min) === min && Number(unmasked) < min) {
        masked = number.format(min)
        unmasked = min.toString()
      }
    }

    el.oldValue = masked
    el.unmasked = unmasked

    // safari makes the cursor jump to the end if el.value gets assign even if to the same value
    if (el.value !== masked) {
      el.value = masked
    }

    // this part needs to be outside the above IF statement for vuetify in firefox
    // drawback is that we endup with two's input events in firefox
    return emit && el.dispatchEvent(InputEvent('input'))
  }
}

/**
 * Input event handler
 *
 * @param {CustomInputEvent} event The event object
 */
export function inputHandler(event: CustomInputEvent) {
  const { target, detail } = event

  // We dont need to run this method on the event we emit (prevent event loop)
  if (detail?.facade) {
    return false
  }

  // since we will be emitting our own custom input event
  // we can stop propagation of this native event
  event.stopPropagation()

  let positionFromEnd = target.value.length
  const { oldValue, options } = target
  if (target.selectionEnd) {
    positionFromEnd = target.value.length - target.selectionEnd
  }

  updateValue(target, null, { clean: !options.precision, emit: false })

  // updated cursor position
  if (options.suffix) {
    positionFromEnd = Math.max(positionFromEnd, options.suffix.length)
  }
  positionFromEnd = target.value.length - positionFromEnd
  if (options.prefix) {
    positionFromEnd = Math.max(positionFromEnd, options.prefix.length)
  }
  updateCursor(target, positionFromEnd)

  if (oldValue !== target.value) {
    target.dispatchEvent(InputEvent('input'))
  }
}

/**
 * Blur event handler
 *
 * @param {CustomInputEvent} event The event object
 */
export function blurHandler(event: CustomInputEvent) {
  const { target } = event

  const { oldValue } = target

  updateValue(target, null, { force: true, clean: true, emit: false })

  if (oldValue !== target.value) {
    target.dispatchEvent(InputEvent('input'))
  }
}

/**
 * Keydown event handler
 *
 * @param {KeyboardEvent} event The event object
 */
export function keydownHandler(event: KeyboardEvent, el: CustomInputElement) {
  const { options } = el
  const { prefix, suffix, decimal, min, separator } = options as Options
  const { key } = event
  const regExp = new RegExp(`${prefix}|${suffix}`, 'g')
  const newValue = el.value.replace(regExp, '')
  const canBeNegative = min === undefined || Number(min) < 0 || Number(min) !== min
  if (key === decimal) {
    if (newValue.includes(decimal)) {
      event.preventDefault()
    } else if (!newValue) {
      el.value = '0' + decimal
      // trigger input event
      el.dispatchEvent(new Event('input'))
    }
  } else if (key === MINUS && !canBeNegative) {
    event.preventDefault()
  } else if (key === 'Backspace') {
    // check current cursor position is after separator when backspace key down
    const selectionEnd = el.selectionEnd || 0
    const character = el.value.slice(selectionEnd - 1, selectionEnd)
    const replace = el.value.slice(selectionEnd - 2, selectionEnd)
    let positionFromEnd = el.value.length - selectionEnd
    if ([prefix, MINUS, separator].includes(character)) {
      event.preventDefault()
      if (character === separator) {
        el.value = el.value.replace(replace, '')
      } else {
        el.value = el.value.replace(new RegExp(`[${prefix}${MINUS}]`, 'g'), '')
      }
      positionFromEnd = Math.max(positionFromEnd, suffix.length)
      positionFromEnd = el.value.length - positionFromEnd
      positionFromEnd = Math.max(positionFromEnd, prefix.length)
      updateCursor(el, positionFromEnd)
      // trigger input event
      el.dispatchEvent(new Event('input'))
    }
  }
}

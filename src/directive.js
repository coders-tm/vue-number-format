import options from './options';
import { NumberFormat, setCursor } from './utils'

export default function (el, binding) {
  const { value } = binding
  if (!value) return false
  const config = Object.assign(options, value)
  // console.log('src/components/directive:config', config)

  // v-number used on a component that's not a input element
  if (el.localName !== 'input') {
    const input = el.getElementsByTagName('input')
    if (input.length < 1) {
      throw new Error(`v-number requires 1 input element, found ${input.length}`)
    } else {
      el = input[0]
    }
  }

  // change the input type to {text} because we can't use it to any other input types
  el.setAttribute('type', 'text')

  el.oninput = () => {
    // console.log('oninput()')
    var positionFromEnd = el.value.length - el.selectionEnd
    el.value = new NumberFormat(config).format(el.value)
    positionFromEnd = Math.max(positionFromEnd, config.suffix.length)
    positionFromEnd = el.value.length - positionFromEnd
    positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1)
    setCursor(el, positionFromEnd)
    // el.dispatchEvent(new Event('change'))
  }

  el.onblur = () => {
    // clean up after end the input
    el.value = new NumberFormat(config).clean().format(el.value)
    el.dispatchEvent(new Event('change'))
  }

  el.onfocus = () => {
    // console.log('onfocus()')
    setCursor(el, el.value.length - config.suffix.length)
  }

  el.onkeydown = (evt) => {
    // Check deciaml
    if (evt.key === config.decimal && evt.target.value.includes(config.decimal)) {
      evt.preventDefault()
    }
    // Allow these keys only
    if (
      // backspace, delete, tab, escape, enter
      [46, 8, 9, 27, 13].indexOf(evt.keyCode) >= 0
      // Ctrl/cmd+A
      || (evt.keyCode === 65 && (evt.ctrlKey || evt.metaKey))
      // Ctrl/cmd+C
      || (evt.keyCode === 67 && (evt.ctrlKey || evt.metaKey))
      // Ctrl/cmd+V
      || (evt.keyCode === 86 && (evt.ctrlKey || evt.metaKey))
      // Ctrl/cmd+R
      || (evt.keyCode === 82 && (evt.ctrlKey || evt.metaKey))
      // Ctrl/cmd+X
      || (evt.keyCode === 88 && (evt.ctrlKey || evt.metaKey))
      // home, end, left, right
      || (evt.keyCode >= 35 && evt.keyCode <= 39)
      || (evt.keyCode >= 48 && evt.keyCode <= 57)
      || evt.keyCode === 109
      || evt.key === config.decimal
    ) {
      return true
    }
    evt.preventDefault()
  }

  // force format after initialization
  el.oninput()
  el.dispatchEvent(new Event('input'))
  el.dispatchEvent(new Event('change'))
}

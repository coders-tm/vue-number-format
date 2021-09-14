import options from './options'

function NumberFormat(opt = options) {
  this.options = Object.assign(options, opt)
  this.input = this.options.null_value
  this.isClean = false
  this.clean = () => {
    this.isClean = true
    return this
  }
  this.negative = () => {
    const negetive = (this.input.toString().indexOf('-') >= 0 && this.numberOnly() > 0) ? '-' : ''
    return negetive
  }
  this.numbers = () => {
    if (typeof this.input === 'number') {
      this.numbers = this.input.toFixed(this.options.precision)
    } else {
      this.numbers = this.numberOnly(this.input)
    }
    return this.numbers
  }
  this.numberOnly = () => {
    const regExp = new RegExp(`[^0-9\\${this.options.decimal}]+`, 'gi')
    this.numbers = this.input.toString().replace(regExp, '')
    if (this.isClean) {
      const parts = this.numbers.split(this.options.decimal)
      return parts.length > 1 && parts[1] ? parts.join(this.options.decimal) : parts[0]
    }
    return this.numbers
  }
  this.parts = () => {
    const parts = this.numbers().toString().split(this.options.decimal)
    parts[0] = this.negative() + (Number(parts[0]) ? Number(parts[0]) : 0)
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, this.options.precision)
    }
    return parts
  }
  this.addSeparator = () => {
    const parts = this.parts()
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`)
    if (this.isClean) {
      return parts[1] && parts[1].length > 0 ? parts.join(this.options.decimal) : parts[0]
    }
    return parts.join(this.options.decimal)
  }
  this.format = (input) => {
    this.input = input
    return this.options.prefix + this.addSeparator() + this.options.suffix
  }
  this.unformat = (input) => {
    this.input = input
    return this.negative() + this.numberOnly()
  }
}

function setCursor(el, position) {
  const setSelectionRange = () => { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

export {
  NumberFormat,
  setCursor,
}

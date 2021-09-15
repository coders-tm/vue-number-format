import options from './options'

function NumberFormat(opt = options) {
  this.options = Object.assign(options, opt)
  this.input = this.options.null_value
  this.number = this.options.null_value
  this.isClean = false
  this.clean = () => {
    this.isClean = true
    return this
  }
  this.negative = () => {
    const negetive = (this.input.toString().indexOf('-') >= 0 && this.realNumber() > 0) ? '-' : ''
    return negetive
  }
  this.numbers = () => {
    if (typeof this.input === 'number') {
      this.number = this.input.toFixed(this.options.precision).toString().replace('-', '').replace('.', this.options.decimal)
    } else {
      this.number = this.numberOnly()
    }
    return this.number
  }
  this.numberOnly = () => {
    const regExp = new RegExp(`[^0-9\\${this.options.decimal}]+`, 'gi')
    this.number = this.input.toString().replace(regExp, '')
    return this.parts(this.number).join(this.options.decimal)
  }
  this.realNumber = () => Number(this.numbers().toString().replace(this.options.decimal, '.'))
  this.parts = (number = '', decimal = this.options.decimal) => {
    var parts = number.toString().split(decimal)
    parts[0] = (Number(parts[0]) ? Number(parts[0]) : 0)
    if (parts.length > 1) {
      parts[1] = parts.slice(1, parts.length).join('')
      parts = parts.slice(0, 2)
      if (parts[1].length > this.options.precision) {
        parts[1] = parts[1].slice(0, this.options.precision)
      }
    }
    return parts.slice(0, 2)
  }
  this.addSeparator = () => {
    var parts = this.numbers().split(this.options.decimal)
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`)
    if (this.isClean) {
      parts[1] = Number(`.${parts[1]}`).toString().replace('0.', '')
      return parts[1] && parts[1] > 0 ? parts.join(this.options.decimal) : parts[0]
    }
    return parts.join(this.options.decimal)
  }
  this.format = (input) => {
    if (input === '') return this.options.null_value
    this.input = input
    return this.negative() + this.options.prefix + this.addSeparator() + this.options.suffix
  }
  this.unformat = (input) => {
    if (input === '') return this.options.null_value
    this.input = input
    return this.negative() + this.realNumber()
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

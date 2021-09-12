import options from './options'

function NumberFormat (input, opt = options) {
  this.options = opt
  this.input = input || this.options.null_value

  this.numbers = function () {
    if (typeof this.input === 'number') {
      return this.input.toFixed(this.options.precision)
    } else {
      return this.numberOnly()
    }
  }

  this.numberOnly = function (clean = false) {
    const regExp = new RegExp(`[^0-9\\${this.options.decimal}]+`, 'gi')
    const numbers = this.input.toString().replace(regExp, '')
    if (clean) {
      const parts = numbers.split(this.options.decimal)
      return parts.length > 1 && parts[1] ? parts.join(this.options.decimal) : parts[0]
    }
    return numbers
  }

  this.negative = (this.input.toString().indexOf('-') >= 0 && this.numbers() > 0) ? '-' : ''

  this.parts = function () {
    var parts = this.numbers().toString().split(this.options.decimal)
    parts[0] = this.negative + (parseInt(parts[0]) ? parseInt(parts[0]) : 0)
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, this.options.precision)
    }
    return parts
  }

  this.addSeparator = function (clean) {
    var parts = this.parts()
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`)
    if (clean) {
      return parts[1] && parts[1].length > 0 ? parts.join(this.options.decimal) : parts[0]
    }
    return parts.join(this.options.decimal)
  }

  this.format = function (clean = false) {
    return this.options.prefix + this.addSeparator(clean) + this.options.suffix
  }
  
  this.unformat = function (clean = true) {
    return this.negative + this.numberOnly(clean)
  }
}

function setCursor (el, position) {
  const setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

export {
  NumberFormat,
  setCursor
}

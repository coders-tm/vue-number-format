import options from './options'

/**
 * Number format function
 * @param {Object} options
 */
export default function NumberFormat(opt = options) {
  this.options = Object.assign(options, opt)
  this.input = ''
  this.number = ''
  this.isClean = false
  this.isNull = (input = this.input) => !this.numberOnly(input, new RegExp('[^0-9]+', 'gi'))
  this.clean = (clean = false) => {
    this.isClean = clean
    return this
  }
  this.sign = () => {
    const sign = (this.input.toString().indexOf('-') >= 0 && this.realNumber() > 0) ? '-' : ''
    return sign
  }
  function between(min, n, max) {
    return Math.max(min, Math.min(n, max))
  }
  // Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
  function fixed(precision) {
    return between(0, precision, 20)
  }
  function toFixed(numbers, precision) {
    // eslint-disable-next-line no-restricted-properties
    var exp = Math.pow(10, precision)
    var float = parseFloat(numbers) / exp
    return float.toFixed(fixed(precision))
  }
  this.toNumber = (string) => Number(string)
  this.numberOnly = (string, regExp) => string.toString().replace(regExp, '')
  this.isNegative = this.sign() === '-'
  this.numbers = () => {
    if (this.options.reverseFill) {
      this.number = toFixed(this.numberOnly(this.input, /\D+/g), this.options.precision).replace('.', this.options.decimal)
    } else if (typeof this.input === 'number') {
      this.number = this.toNumber(this.input.toFixed(this.options.precision)).toString().replace('-', '').replace('.', this.options.decimal)
    // eslint-disable-next-line no-restricted-globals
    } else if (!isNaN(this.toNumber(this.input))) {
      this.number = this.input.replace('-', '').replace('.', this.options.decimal)
    } else {
      this.number = this.numberOnly(this.input, new RegExp(`[^0-9\\${this.options.decimal}]+`, 'gi'))
      this.number = this.parts(this.number).join(this.options.decimal)
    }
    return this.number
  }
  this.realNumber = () => this.toNumber(this.numbers().toString().replace(this.options.decimal, '.'))
  this.parts = (number = '', decimal = this.options.decimal) => {
    var parts = number.toString().split(decimal)
    parts[0] = this.toNumber(parts[0]) || 0
    if (parts.length > 1) {
      parts[1] = parts.slice(1, parts.length).join('')
      parts = parts.slice(0, 2)
      if (parts[1].length > this.options.precision) {
        parts[1] = this.toNumber(`.${parts[1]}`).toFixed(this.options.precision).toString().replace('0.', '')
      }
    }
    return parts.slice(0, 2)
  }
  this.addSeparator = () => {
    var parts = this.numbers().split(this.options.decimal)
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`)
    if (this.isClean) {
      parts[1] = this.toNumber(`.${parts[1]}`).toString().replace('0.', '')
      return parts[1] && parts[1] > 0 ? parts.join(this.options.decimal) : parts[0]
    }
    return parts.join(this.options.decimal)
  }
  /**
   * Format the input with default config if there is no constructor config
   * @param {Number, String} input
   * @return {String}
   */
  this.format = (input) => {
    if (input === '') return this.options.null_value
    this.input = input
    if (this.isNull()) return this.options.null_value
    return this.sign() + this.options.prefix + this.addSeparator() + this.options.suffix
  }
  /**
   * Unformat the input with default config if there is no constructor config
   * @param {Number, String} input
   * @return {String}
   */
  this.unformat = (input) => {
    if (input === '') return this.options.null_value
    this.input = input
    if (this.isNull()) return this.options.null_value
    return this.toNumber(this.sign() + this.realNumber())
  }
}

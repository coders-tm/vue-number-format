import options from './options'

/**
 * Number format function
 * @param {Object} options
 */
export default function NumberFormat(config = options) {
  this.options = Object.assign(options, config)
  this.input = ''
  this.number = ''
  this.isClean = true

  const { prefix, suffix, decimal } = options

  this.preSurRegExp = new RegExp(`${prefix}|${suffix}`, 'g')
  this.numberRegExp = new RegExp(`[^0-9\\${decimal}]+`, 'gi')
  this.cleanRegExp = new RegExp('[^0-9]+', 'gi')
  this.negativeRegExp = new RegExp('[^0-9\\-]+', 'gi')

  this.isNull = (input = this.input) => {
    if (this.isClean) {
      return !this.numberOnly(input, this.cleanRegExp)
    }
    return !this.numberOnly(input, this.negativeRegExp)
  }

  this.clean = (clean = false) => {
    this.isClean = clean
    return this
  }

  this.sign = () => {
    if (this.isClean) {
      return this.input.toString().indexOf('-') >= 0 && this.realNumber() > 0
        ? '-'
        : ''
    }
    return this.input.toString().indexOf('-') >= 0 ? '-' : ''
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
    var float = parseFloat(numbers) / exp || 0
    return float.toFixed(fixed(precision))
  }

  this.toNumber = (string) => Number(string)

  this.numberOnly = (string, regExp) => string?.toString().replace(regExp, '')

  this.isNegative = this.sign() === '-'

  this.numbers = () => {
    if (this.options.reverseFill) {
      this.number = toFixed(
        this.numberOnly(this.input, /\D+/g),
        this.options.precision
      ).replace('.', this.options.decimal)
    } else if (typeof this.input === 'number') {
      this.number = this.parts(
        this.input.toString().replace('-', ''),
        '.'
      ).join(this.options.decimal)
    } else {
      const input = this.input.replace(this.preSurRegExp, '')
      this.number = this.numberOnly(input, this.numberRegExp)
      this.number = this.parts(this.number).join(this.options.decimal)
    }
    return this.number
  }

  this.realNumber = () => {
    return this.numbers().toString().replace(this.options.decimal, '.')
  }

  this.parts = (number = '', decimal = this.options.decimal) => {
    var parts = number.toString().split(decimal)

    if (parts.length > 1) {
      parts[0] = this.toNumber(parts[0]) || 0
      parts[1] = parts.slice(1, parts.length).join('')
      parts = parts.slice(0, 2)
    }

    if (this.isClean) {
      const newNumber = this.toNumber(parts.join('.')).toFixed(
        this.options.precision
      )
      const cleanNumber = this.toNumber(newNumber)
      const minimumDigits = cleanNumber.toFixed(
        this.options.minimumFractionDigits
      )

      if (
        this.options.minimumFractionDigits &&
        this.options.minimumFractionDigits >= 0 &&
        cleanNumber.toString().length < minimumDigits.length
      ) {
        parts = minimumDigits.toString().split('.')
      } else {
        parts = cleanNumber.toString().split('.')
      }
    }

    return parts.slice(0, 2)
  }

  this.addSeparator = () => {
    var parts = this.numbers().split(this.options.decimal)
    parts[0] = parts[0]
      .toString()
      .replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`)
    return parts.join(this.options.decimal)
  }

  /**
   * Format the input with default config if there is no constructor config
   * @param {Number, String} input
   * @return {String}
   */
  this.format = (input = '') => {
    this.input = input
    if (this.isNull() && !this.options.reverseFill)
      return this.options.nullValue
    return (
      this.sign() +
      this.options.prefix +
      this.addSeparator() +
      this.options.suffix
    )
  }

  /**
   * Unformat the input with default config if there is no constructor config
   * @param {Number, String} input
   * @return {String}
   */
  this.unformat = (input = '') => {
    this.input = input
    if (this.isNull() && !this.options.reverseFill)
      return this.options.nullValue
    return this.sign() + this.realNumber()
  }
}

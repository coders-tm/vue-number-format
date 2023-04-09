import defaultOptions, { Options } from './options'
import { Input } from './core'

export interface Config {
  prefix: string
  suffix: string
  separator: string
  decimal: string
  precision: number
  minimumFractionDigits: number
  prefill: boolean
  reverseFill: boolean
  min: number
  max: number
  nullValue: string
}

function between(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed(precision: number) {
  return between(0, precision, 20)
}

/**
 * Number format class
 * @param {Options} config
 */
export default class NumberFormat {
  options: Config
  input: Input
  number: Input
  isClean: boolean
  preSurRegExp: RegExp
  numberRegExp: RegExp
  cleanRegExp: RegExp
  negativeRegExp: RegExp

  constructor(config?: Options) {
    this.options = Object.assign(defaultOptions, config)
    const { prefix, suffix, decimal, reverseFill } = this.options

    this.input = ''
    this.number = ''
    this.isClean = !reverseFill

    this.preSurRegExp = new RegExp(`${prefix}|${suffix}`, 'g')
    this.numberRegExp = new RegExp(`[^0-9\\${decimal}]+`, 'gi')
    this.cleanRegExp = new RegExp('[^0-9]+', 'gi')
    this.negativeRegExp = new RegExp('[^0-9\\-]+', 'gi')
  }

  isNull() {
    return !this.numberOnly(this.isClean ? this.cleanRegExp : this.negativeRegExp)
  }

  clean(clean = false) {
    this.isClean = clean
    return this
  }

  sign() {
    if (this.input === null || this.input === undefined) {
      return ''
    }
    const hasMinus = this.input.toString().indexOf('-') >= 0
    if (this.isClean) {
      return hasMinus && this.realNumber() > 0 ? '-' : ''
    }
    return hasMinus ? '-' : ''
  }

  toFixed() {
    const exp = Math.pow(10, this.options.precision)
    const float = parseFloat(this.numberOnly(/\D+/g)) / exp || 0
    return float.toFixed(fixed(this.options.precision))
  }

  toNumber(str: Input) {
    return Number(str)
  }

  numberOnly(regExp?: RegExp) {
    return this.input
      ?.toString()
      .replace(this.preSurRegExp, '')
      .replace(regExp || this.numberRegExp, '')
  }

  isNegative() {
    return this.sign() === '-'
  }

  numbers() {
    const { reverseFill, decimal } = this.options
    if (reverseFill) {
      this.number = this.toFixed().replace('.', decimal)
      console.log('reverseFill', this.number)
    } else if (typeof this.input === 'number') {
      this.number = this.parts(this.input.toString().replace('-', ''), '.').join(decimal)
      console.log('number', this.number)
    } else {
      this.number = this.parts(this.numberOnly()).join(decimal)
      console.log('else', this.numberRegExp, this.numberOnly(), this.number)
    }

    return this.number
  }

  unformatNumber(): string {
    return this.numbers().toString().replace(this.options.decimal, '.')
  }

  realNumber(): number {
    return parseFloat(this.unformatNumber())
  }

  parts(num: Input, separator?: string) {
    const { precision, minimumFractionDigits, decimal } = this.options
    let parts: Input[] = num.toString().split(separator || decimal)

    if (parts.length > 1) {
      parts[0] = this.toNumber(parts[0]) || 0
      parts[1] = parts.slice(1, parts.length).join('')
      parts = parts.slice(0, 2)
    }

    if (this.isClean) {
      const newNumber = this.toNumber(parts.join('.')).toFixed(precision)
      const cleanNumber = this.toNumber(newNumber)
      const minimumDigits = cleanNumber.toFixed(minimumFractionDigits)
      const hasMinFraction = minimumFractionDigits >= 0 && cleanNumber.toString().length < minimumDigits.length

      if (hasMinFraction) {
        parts = minimumDigits.toString().split('.')
      } else {
        parts = cleanNumber.toString().split('.')
      }
    }

    return parts.slice(0, 2)
  }

  addSeparator() {
    const { decimal, separator } = this.options
    const parts: Input[] = this.numbers().split(decimal)
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
    return parts.join(decimal)
  }

  /**
   * Format the input with default config if there is no constructor config
   * @param {Input} input
   * @return {String}
   */
  format(input: Input): string {
    this.input = input
    const { reverseFill, nullValue, prefix, suffix } = this.options
    if (this.isNull() && !reverseFill) {
      return nullValue
    }
    return this.sign() + prefix + this.addSeparator() + suffix
  }

  /**
   * Unformat the input with default config if there is no constructor config
   * @param {Input} input
   * @return {String}
   */
  unformat(input: Input): string {
    this.input = input
    const { reverseFill, nullValue } = this.options
    if (this.isNull()) {
      return nullValue
    }
    if (reverseFill && this.realNumber() === 0) {
      return nullValue
    }
    return this.sign() + this.realNumber()
  }
}

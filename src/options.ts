export interface Options {
  prefix?: string
  suffix?: string
  separator?: string
  decimal?: string
  inputmode?: string
  precision?: number
  minimumFractionDigits?: number
  prefill?: boolean
  reverseFill?: boolean
  min?: number
  max?: number
  nullValue?: string
}

export default {
  prefix: '',
  suffix: '',
  separator: ',',
  decimal: '.',
  inputmode: 'numeric',
  precision: 2,
  minimumFractionDigits: null,
  prefill: true,
  reverseFill: false,
  min: null,
  max: null,
  nullValue: ''
}

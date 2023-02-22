export interface Options {
  prefix?: string
  suffix?: string
  separator?: string
  decimal?: string
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
  precision: 2,
  minimumFractionDigits: undefined,
  prefill: true,
  reverseFill: false,
  min: undefined,
  max: undefined,
  nullValue: ''
}

import { NumberFormat } from '../../src'
import { expect, test } from 'vitest'

test('test number format', async () => {
  const number = new NumberFormat({
    prefix: '$',
    suffix: '',
    separator: ',',
    decimal: '.',
    precision: 2,
    prefill: true,
    reverseFill: false,
    nullValue: ''
  })

  expect(number.format('458.869')).toBe('$458.87')
  expect(number.unformat('458.869')).toBe('458.87')
})

test('test number format: minimumFractionDigits', async () => {
  const number = new NumberFormat({
    prefix: '$',
    suffix: '',
    separator: ',',
    decimal: '.',
    precision: 3,
    prefill: true,
    reverseFill: false,
    minimumFractionDigits: 2,
    nullValue: ''
  })

  expect(number.format('458.2')).toBe('$458.20')
})

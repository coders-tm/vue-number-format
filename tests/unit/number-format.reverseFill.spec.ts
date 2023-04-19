import { NumberFormat } from '../../src'
import { expect, test } from 'vitest'

test('when enabled reverse fill', () => {
  const numberFormat = new NumberFormat({
    reverseFill: true,
    prefix: '$'
  })

  expect(numberFormat.format('')).toEqual('$0.00')
  expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
  expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
  expect(numberFormat.format('sdfgasd55468.546-')).toEqual('-$554,685.46')
  expect(numberFormat.format('-1234.6512')).toEqual('-$123,465.12')
  expect(numberFormat.format('0')).toEqual('$0.00')

  expect(numberFormat.format('')).toEqual('$0.00')
  expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
  expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
  expect(numberFormat.format('sdfgasd55468.546-')).toEqual('-$554,685.46')
  expect(numberFormat.format('-1234.6512')).toEqual('-$123,465.12')
  expect(numberFormat.format(0)).toEqual('$0.00')
  expect(numberFormat.format(0.0)).toEqual('$0.00')

  expect(numberFormat.unformat('')).toEqual('')
  expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
  expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
  expect(numberFormat.unformat('sdfgasd55468.546-')).toEqual('-554685.46')
  expect(numberFormat.unformat('-1234.6512')).toEqual('-123465.12')
})

import { NumberFormat } from '../../src'
import { expect, test } from 'vitest'

test('format when options are custom', () => {
  const numberFormat = new NumberFormat({
    precision: 0
  })
  expect(numberFormat.format(12345.54921)).toEqual('12,346')
  expect(numberFormat.format(12345.12345)).toEqual('12,345')
  expect(numberFormat.format(12345.54321)).toEqual('12,346')
  expect(numberFormat.format(12345.54321)).toEqual('12,346')
})

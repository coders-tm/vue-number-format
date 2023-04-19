import { NumberFormat } from '../../src'
import { expect, test } from 'vitest'

test('format when options are custom', () => {
  const numberFormat = new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    nullValue: ''
  })

  expect(numberFormat.format('')).toEqual('')
  expect(numberFormat.format('0')).toEqual('$0')
  expect(numberFormat.format('0,')).toEqual('$0')
  expect(numberFormat.format('-0,0')).toEqual('$0')
  expect(numberFormat.format('0,10')).toEqual('$0,1')
  expect(numberFormat.format('0,0-')).toEqual('$0')
  expect(numberFormat.format('0,10-')).toEqual('-$0,1')
  expect(numberFormat.format('12.345,54921')).toEqual('$12.345,55')
  expect(numberFormat.format('--12.345,12345')).toEqual('-$12.345,12')
  expect(numberFormat.format('12.345.54321,12945')).toEqual('$1.234.554.321,13')
  expect(numberFormat.format('-12.345,,54321-')).toEqual('-$12.345,54')

  expect(numberFormat.format(0)).toEqual('$0')
  expect(numberFormat.format(0)).toEqual('$0')
  expect(numberFormat.format(0.0)).toEqual('$0')
  expect(numberFormat.format(-0.1)).toEqual('-$0,1')
  expect(numberFormat.format(-0.0)).toEqual('$0')
  expect(numberFormat.format(0.1)).toEqual('$0,1')
  expect(numberFormat.format(12345.54921)).toEqual('$12.345,55')
  expect(numberFormat.format(12345.12345)).toEqual('$12.345,12')
  expect(numberFormat.format(12345.54321)).toEqual('$12.345,54')
  expect(numberFormat.format(12345.54321)).toEqual('$12.345,54')
})

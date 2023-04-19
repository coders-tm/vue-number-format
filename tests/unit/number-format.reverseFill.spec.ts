import { NumberFormat } from '../../src'

test('when enabled reverse fill', () => {
  const numberFormat = new NumberFormat({
    reverseFill: true,
    prefix: '$'
  })
  test('should return as follows', () => {
    expect(numberFormat.format('')).toEqual('$0.00')
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
    expect(numberFormat.format('sdfgasd55468.546-')).toEqual('-$554,685.46')
    expect(numberFormat.format('-1234.6512')).toEqual('-$123,465.12')
    expect(numberFormat.format('0')).toEqual('$0.00')
  })
  test('should return as follows', () => {
    expect(numberFormat.format('')).toEqual('$0.00')
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('$554,685.46')
    expect(numberFormat.format('sdfgasd55468.546-')).toEqual('-$554,685.46')
    expect(numberFormat.format('-1234.6512')).toEqual('-$123,465.12')
    expect(numberFormat.format(0)).toEqual('$0.00')
    expect(numberFormat.format(0.0)).toEqual('$0.00')
  })
  test('should return as follows', () => {
    expect(numberFormat.unformat('')).toEqual('0')
    expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
    expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
    expect(numberFormat.unformat('sdfgasd55468.546-')).toEqual('-554685.46')
    expect(numberFormat.unformat('-1234.6512')).toEqual('-123465.12')
  })
})

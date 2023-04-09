import NumberFormat from '../../src/number-format'

test('when enabled reverse fill', () => {
  const numberFormat = new NumberFormat({
    minimumFractionDigits: 2
  })
  test('should return as follows', () => {
    expect(numberFormat.format('')).toEqual('')
    expect(numberFormat.format('55468')).toEqual('55,468.00')
    expect(numberFormat.format('55468.5')).toEqual('55,468.50')
    expect(numberFormat.format('55468.546-')).toEqual('-55,468.55')
    expect(numberFormat.format('-1234.6512')).toEqual('-1,234.65')
  })
  test('should return as follows', () => {
    expect(numberFormat.unformat('')).toEqual('')
    expect(numberFormat.unformat('55468')).toEqual('55468')
    expect(numberFormat.unformat('55468.50')).toEqual('55468.5')
    expect(numberFormat.unformat('55468.546-')).toEqual('-55468.55')
    expect(numberFormat.unformat('-1234.6512')).toEqual('-1234.65')
  })
})

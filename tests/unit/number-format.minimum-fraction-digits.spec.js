import NumberFormat from '../../src/number-format'

describe('when enabled reverse fill', () => {
  const numberFormat = new NumberFormat({
    minimumFractionDigits: 2,
  })
  it('should return as follows', () => {
    expect(numberFormat.clean(true).format()).toEqual('')
    expect(numberFormat.clean(true).format('')).toEqual('')
    expect(numberFormat.clean(true).format('55468')).toEqual('55,468.00')
    expect(numberFormat.clean(true).format('55468.5')).toEqual('55,468.50')
    expect(numberFormat.clean(true).format('55468.546-')).toEqual('-55,468.55')
    expect(numberFormat.clean(true).format('-1234.6512')).toEqual('-1,234.65')
  })
  it('should return as follows', () => {
    expect(numberFormat.clean(true).unformat()).toEqual('')
    expect(numberFormat.clean(true).unformat('')).toEqual('')
    expect(numberFormat.clean(true).unformat('55468')).toEqual('55468.00')
    expect(numberFormat.clean(true).unformat('55468.50')).toEqual('55468.50')
    expect(numberFormat.clean(true).unformat('55468.546-')).toEqual('-55468.55')
    expect(numberFormat.clean(true).unformat('-1234.6512')).toEqual('-1234.65')
  })
})

import NumberFormat from '../../src/number-format'

describe('when enabled reverse fill', () => {
  const numberFormat = new NumberFormat({
    reverseFill: true
  })
  it('should return as follows', () => {
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('554,685.46')
    expect(numberFormat.format('sdfgasd55468.546')).toEqual('554,685.46')
    expect(numberFormat.format('sdfgasd55468.546-')).toEqual('-554,685.46')
    expect(numberFormat.format('-1234.6512')).toEqual('-123,465.12')
  })
  it('should return as follows', () => {
    expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
    expect(numberFormat.unformat('sdfgasd55468.546')).toEqual('554685.46')
    expect(numberFormat.unformat('sdfgasd55468.546-')).toEqual('-554685.46')
    expect(numberFormat.unformat('-1234.6512')).toEqual('-123465.12')
  })
})



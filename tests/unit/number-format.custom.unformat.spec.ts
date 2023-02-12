import NumberFormat from '../../src/number-format'

test('unformat when options are default', () => {
  const numberFormat = new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    nullValue: ''
  })
  test('unformat string value', () => {
    expect(numberFormat.clean(true).unformat('')).toEqual('')
    expect(numberFormat.clean(true).unformat('0')).toEqual('0')
    expect(numberFormat.clean(true).unformat('0,')).toEqual('0')
    expect(numberFormat.clean(true).unformat('-0,0')).toEqual('0')
    expect(numberFormat.clean(true).unformat('0,10')).toEqual('0.1')
    expect(numberFormat.clean(true).unformat('0,0-')).toEqual('0')
    expect(numberFormat.clean(true).unformat('0,10-')).toEqual('-0.1')
    expect(numberFormat.clean(true).unformat('12.345,54921')).toEqual('12345.55')
    expect(numberFormat.clean(true).unformat('--12.345,12345')).toEqual('-12345.12')
    expect(numberFormat.clean(true).unformat('12.345.54321,12345')).toEqual('1234554321.12')
    expect(numberFormat.clean(true).unformat('-12.345,,54321-')).toEqual('-12345.54')
  })
  test('unformat numerical value', () => {
    expect(numberFormat.clean(true).unformat(0)).toEqual('0')
    expect(numberFormat.clean(true).unformat(0)).toEqual('0')
    expect(numberFormat.clean(true).unformat(0.0)).toEqual('0')
    expect(numberFormat.clean(true).unformat(-0.1)).toEqual('-0.1')
    expect(numberFormat.clean(true).unformat(-0.0)).toEqual('0')
    expect(numberFormat.clean(true).unformat(0.1)).toEqual('0.1')
    expect(numberFormat.clean(true).unformat(12345.54921)).toEqual('12345.55')
    expect(numberFormat.clean(true).unformat(12345.12345)).toEqual('12345.12')
    expect(numberFormat.clean(true).unformat(12345.54321)).toEqual('12345.54')
    expect(numberFormat.clean(true).unformat(12345.54321)).toEqual('12345.54')
  })
})

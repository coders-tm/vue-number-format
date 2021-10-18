import NumberFormat from '../../src/number-format'

describe('should not throw error on empty config', () => {
  expect(() => new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    null_value: 0,
  })).not.toThrow()
})
describe('when the value is invalid with custom config', () => {
  const numberFormat = new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    null_value: 0,
  })
  it('should return as follows', () => {
    expect(numberFormat.format('')).toEqual('')
    expect(numberFormat.format('foo')).toEqual('')
    expect(numberFormat.format('-foo')).toEqual('')
    expect(numberFormat.format('-fo,o-')).toEqual('')
    expect(numberFormat.format('-fo.o-')).toEqual('')
    expect(numberFormat.format('!@#$%^&*()')).toEqual('')
  })
  it('should return as follows', () => {
    expect(numberFormat.clean(true).format('')).toEqual('')
    expect(numberFormat.clean(true).format('foo')).toEqual('')
    expect(numberFormat.clean(true).format('-foo')).toEqual('')
    expect(numberFormat.clean(true).format('-fo.o-')).toEqual('')
    expect(numberFormat.clean(true).format('-fo,o-')).toEqual('')
    expect(numberFormat.clean(true).format('!@#$%^&*()')).toEqual('')
  })
  it('should return as follows', () => {
    expect(numberFormat.clean(true).unformat('')).toEqual('')
    expect(numberFormat.clean(true).unformat('foo')).toEqual('')
    expect(numberFormat.clean(true).unformat('-foo')).toEqual('')
    expect(numberFormat.clean(true).unformat('-fo.o-')).toEqual('')
    expect(numberFormat.clean(true).unformat('!@#$%^&*()')).toEqual('')
  })
})
describe('format when options are custom', () => {
  const numberFormat = new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    null_value: '',
  })
  it('format string value', () => {
    expect(numberFormat.format('0')).toEqual('$0')
    expect(numberFormat.format('0,')).toEqual('$0,')
    expect(numberFormat.format('-0,0')).toEqual('$0,0')
    expect(numberFormat.format('0,10')).toEqual('$0,10')
    expect(numberFormat.format('0,0-')).toEqual('$0,0')
    expect(numberFormat.format('0,10-')).toEqual('-$0,10')
    expect(numberFormat.format('12.345,54921')).toEqual('$12.345,54921')
    expect(numberFormat.format('--12.345,12345')).toEqual('-$12.345,12345')
    expect(numberFormat.format('12.345.54321,12945')).toEqual('$1.234.554.321,12945')
    expect(numberFormat.format('-12.345,,54321-')).toEqual('-$12.345,54321')
  })
  it('format numerical value', () => {
    expect(numberFormat.format(0)).toEqual('')
    expect(numberFormat.format(0.)).toEqual('')
    expect(numberFormat.format(0.0)).toEqual('')
    expect(numberFormat.format(-0.10)).toEqual('-$0,1')
    expect(numberFormat.format(-0.0)).toEqual('')
    expect(numberFormat.format(0.10)).toEqual('$0,1')
    expect(numberFormat.format(12345.54921)).toEqual('$12.345,54921')
    expect(numberFormat.format(12345.12345)).toEqual('$12.345,12345')
    expect(numberFormat.format(12345.54321)).toEqual('$12.345,54321')
    expect(numberFormat.format(12345.54321)).toEqual('$12.345,54321')
  })
  it('format and clean numerical value', () => {
    expect(numberFormat.clean(true).format(0)).toEqual('')
    expect(numberFormat.clean(true).format(0.)).toEqual('')
    expect(numberFormat.clean(true).format(0.0)).toEqual('')
    expect(numberFormat.clean(true).format(0.10)).toEqual('$0,1')
    expect(numberFormat.clean(true).format(-0.0)).toEqual('')
    expect(numberFormat.clean(true).format(-0.10)).toEqual('-$0,1')
    expect(numberFormat.clean(true).format(12345.54921)).toEqual('$12.345,55')
    expect(numberFormat.clean(true).format(12345.12345)).toEqual('$12.345,12')
    expect(numberFormat.clean(true).format(12345.54321)).toEqual('$12.345,54')
    expect(numberFormat.clean(true).format(12345.54321)).toEqual('$12.345,54')
  })
})
describe('unformat when options are default', () => {
  const numberFormat = new NumberFormat({
    prefix: '$',
    separator: '.',
    decimal: ',',
    null_value: '',
  })
  it('unformat string value', () => {
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
  it('unformat numerical value', () => {
    expect(numberFormat.clean(true).unformat(0)).toEqual('')
    expect(numberFormat.clean(true).unformat(0.)).toEqual('')
    expect(numberFormat.clean(true).unformat(0.0)).toEqual('')
    expect(numberFormat.clean(true).unformat(-0.10)).toEqual('-0.1')
    expect(numberFormat.clean(true).unformat(-0.0)).toEqual('')
    expect(numberFormat.clean(true).unformat(0.10)).toEqual('0.1')
    expect(numberFormat.clean(true).unformat(12345.54921)).toEqual('12345.55')
    expect(numberFormat.clean(true).unformat(12345.12345)).toEqual('12345.12')
    expect(numberFormat.clean(true).unformat(12345.54321)).toEqual('12345.54')
    expect(numberFormat.clean(true).unformat(12345.54321)).toEqual('12345.54')
  })
})

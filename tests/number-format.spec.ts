import NumberFormat from '../src/number-format'

test('test number format', async () => {
  const number = new NumberFormat({
    prefix: '$',
    suffix: '',
    separator: ',',
    decimal: '.',
    precision: 2,
    minimumFractionDigits: 1,
    prefill: true,
    reverseFill: false,
    nullValue: ''
  })

  expect(number.format('458.869')).toBe('$458.87')
})

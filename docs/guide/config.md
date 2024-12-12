# Config

The following options can be passed as an object literal to the NumberFormat function.

## prefix

A word, letter, or number placed before `value`

- Type: `string`
- Default: `''`
- Required: `false`

## suffix

A word, letter, or number placed after `value`

- Type: `string`
- Default: `''`
- Required: `false`

## separator

Character used as the thousands separator

- Type: `string`
- Default: `','`
- Required: `false`

## decimal

Character used to separate the integer part from the fractional part of a number

- Type: `string`
- Default: `'.'`
- Required: `false`

## precision

The precision property returns the number of bits of precision that can be represented.

- Type: `string`
- Default: `2`
- Required: `false`

## minimumFractionDigits

The minimum number of digits after the decimal separator.

- Type: `string`
- Default: `false`
- Required: `false`

## prefill

Set initial value before mount the component

- Type: `boolean`
- Default: `true`
- Required: `false`

## reverseFill

Fills string from the right side of the mask

- Type: `boolean`
- Default: `false`
- Required: `false`

## masked

Model will be masked (with contain separation characters)

::: warning
Masking doesn't work with directive
:::

- Type: `boolean`
- Default: `false`
- Required: `false`

## min

The `min` attribute specifies the minimum value for an `<input>` element.

- Type: `string`
- Default: `false`
- Required: `false`

## max

The `max` attribute specifies the maximum value for an `<input>` element.

- Type: `string`
- Default: `false`
- Required: `false`

## nullValue

Value of `<input>` element is set to a default when no `value` present

- Type: `string`
- Default: `''`
- Required: `false`

## inputmode

The [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) global attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents. This allows a browser to display an appropriate virtual keyboard.

- Type: `string`
- Default: `numeric`
- Required: `false`

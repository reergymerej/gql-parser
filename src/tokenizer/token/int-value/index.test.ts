import {GetTokenResult} from '../../types'
import {isDigit} from '../digit'
import intValue from '../int-value'
import {isNegativeSign} from '../negative-sign'
import {isNonZeroDigit} from '../non-zero-digit'

describe('IntValue', () => {
  describe('negative test', () => {
    it('should NOT return the IntValue', () => {
      const input = '#This is not a IntValue.'
      const actual = intValue(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  it('should return the IntValue', () => {
    const head = '-1234'
    const remainingInput = '#and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = intValue(input)
    const expected: GetTokenResult = {
      token: {
        type: 'IntValue',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

describe('NegativeSign', () => {
  it.each([
    [ true, '-' ],
    [ false, '!' ],
  ])('should return %s for %s', (expected, value) => {
    const actual = isNegativeSign(value)
    expect(actual).toEqual(expected)
  })
})

describe('Digit', () => {
  it.each([
    [ true, '0' ],
    [ true, '1' ],
    [ true, '2' ],
    [ true, '3' ],
    [ true, '4' ],
    [ true, '5' ],
    [ true, '6' ],
    [ true, '7' ],
    [ true, '8' ],
    [ true, '9' ],
    [ false, '!' ],
  ])('should return %s for %s', (expected, value) => {
    const actual = isDigit(value)
    expect(actual).toEqual(expected)
  })
})

describe('NonZeroDigit', () => {
  it.each([
    [ false, '0' ],
    [ true, '1' ],
    [ true, '2' ],
    [ true, '3' ],
    [ true, '4' ],
    [ true, '5' ],
    [ true, '6' ],
    [ true, '7' ],
    [ true, '8' ],
    [ true, '9' ],
  ])('should return %s for %s', (expected, value) => {
    const actual = isNonZeroDigit(value)
    expect(actual).toEqual(expected)
  })
})

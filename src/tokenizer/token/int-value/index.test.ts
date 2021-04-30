import {GetTokenResult} from '../../types'
import intValue, {isNegativeSign} from '../int-value'

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

  xit('should return the IntValue', () => {
    const head = 'XXX'
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

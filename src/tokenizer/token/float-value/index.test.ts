import {GetTokenResult} from '../../types'
import floatValue from '../float-value'

describe('FloatValue', () => {
  describe('negative test', () => {
    it('should NOT return the FloatValue', () => {
      const input = '#This is not a FloatValue.'
      const actual = floatValue(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('positive tests', () => {
    it.each([
      // '-0.1230', // one
      // '2e+10', // two
      '6.0221413e23', // IntegerPart FractionalPart ExponentPart
      // '-',
    ])('should return the FloatValue for %s', (head) => {
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = floatValue(input)
      const expected: GetTokenResult = {
        token: {
          type: 'FloatValue',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})

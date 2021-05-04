import {GetTokenResult} from '../types'
import fractionalPart from './fractional-part'

describe('FractionalPart', () => {
  describe('negative test', () => {
    it('should NOT return the FractionalPart', () => {
      const input = '#This is not a FractionalPart.'
      const actual = fractionalPart(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('positive tests', () => {
    it.each([
      '.12340',
      '.000001',
    ])('should return the FractionalPart for %s', (head) => {
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = fractionalPart(input)
      const expected: GetTokenResult = {
        token: {
          type: 'FractionalPart',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})


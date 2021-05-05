import {GetTokenResult} from '../types'
import exponentPart from './exponent-part'

describe('ExponentPart', () => {
  describe('negative test', () => {
    it('should NOT return the ExponentPart', () => {
      const input = '#This is not a ExponentPart.'
      const actual = exponentPart(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('positive tests', () => {
    it.each([
      'e123',
      'E123',
      'e-123',
      'E-123',
      'e+123',
      'E+123',
    ])('should return the ExponentPart for %s', (head) => {
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = exponentPart(input)
      const expected: GetTokenResult = {
        token: {
          type: 'ExponentPart',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})

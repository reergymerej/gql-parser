import {GetTokenResult} from '../types'
import exponentIndicator from './exponent-indicator'

describe('ExponentIndicator', () => {
  describe('negative test', () => {
    it('should NOT return the ExponentIndicator', () => {
      const input = '#This is not a ExponentIndicator.'
      const actual = exponentIndicator(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  it.each([
    'e',
    'E',
  ])('should return the ExponentIndicator for %s', (head) => {
    const remainingInput = '#and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = exponentIndicator(input)
    const expected: GetTokenResult = {
      token: {
        type: 'ExponentIndicator',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

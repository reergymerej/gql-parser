import {GetTokenResult} from '../types'
import punctuator from './punctuator'

describe('Punctuator', () => {
  describe('negative test', () => {
    it('should NOT return the Punctuator', () => {
      const input = 'This is not a punctuator.'
      const actual = punctuator(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe.each([
    '!',
    '$',
    '(',
    ')',
    '...',
    ':',
    '=',
    '@',
    '[',
    ']',
    '{',
    '|',
    '}',
  ])('for the value %s', (head) => {
    it('should return the Punctuator', () => {
      const remainingInput = 'and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = punctuator(input)
      const expected: GetTokenResult = {
        token: {
          type: 'Punctuator',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})

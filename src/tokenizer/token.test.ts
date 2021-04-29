import {getToken} from './token'
import {GetTokenResult} from './types'
import * as punctuator from './punctuator'
import * as ignored from './ignored'

const input = 'THIS IS SOME SILLY ASS INPUT'
const nope: GetTokenResult = {
  token: null,
  remainingInput: input,
}

describe('getToken', () => {
  beforeEach(() => {
    jest.spyOn(punctuator, 'getToken').mockReturnValue(nope)
    jest.spyOn(ignored, 'getToken').mockReturnValue(nope)
  })

  describe('when it is Ignored', () => {
    beforeEach(() => {
      jest.spyOn(ignored, 'getToken').mockReturnValue({
        token: {
          ignored: true,
          type: 'Ignored',
          value: input,
        },
        remainingInput: input,
      })
    })

    it('should return the Ignored', () => {
      const actual = getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'Ignored',
          value: input,
        },
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('when it is Punctuator', () => {
    beforeEach(() => {
      jest.spyOn(punctuator, 'getToken').mockReturnValue({
        token: {
          type: 'Punctuator',
          value: input,
        },
        remainingInput: input,
      })
    })

    it('should return the Punctuator', () => {
      const actual = getToken(input)
      const expected: GetTokenResult = {
        token: {
          type: 'Punctuator',
          value: input,
        },
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })
})

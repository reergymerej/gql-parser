import {getToken} from './token'
import {Token} from './types'
import * as punctuator from './punctuator'
import * as ignored from './ignored'

describe('getToken', () => {
  beforeEach(() => {
    jest.spyOn(punctuator, 'getToken').mockReturnValue(null)
    jest.spyOn(ignored, 'getToken').mockReturnValue(null)
  })

  describe('when the input is valid', () => {
    const input = 'THIS IS SOME SILLY ASS INPUT'

    describe('when it is Ignored', () => {
      beforeEach(() => {
        jest.spyOn(ignored, 'getToken').mockReturnValue({
          ignored: true,
          type: 'Ignored',
          value: input,
        })
      })

      it('should return the Ignored', () => {
        const actual = getToken(input)
        const expected: Token = {
          ignored: true,
          type: 'Ignored',
          value: input,
        }
        expect(actual).toEqual(expected)
      })
    })

    describe('when it is Punctuator', () => {
      beforeEach(() => {
        jest.spyOn(punctuator, 'getToken').mockReturnValue({
          type: 'Punctuator',
          value: input,
        })
      })

      it('should return the Punctuator', () => {
        const actual = getToken(input)
        const expected: Token = {
          type: 'Punctuator',
          value: input,
        }
        expect(actual).toEqual(expected)
      })
    })
  })
})

import {GetTokenResult} from './types'
import * as ignored from './ignored'

describe('ignored', () => {
  it('should return the UnicodeBOM', () => {
    const input = '\uFEFF'
    const actual = ignored.getToken(input)
    const expected: GetTokenResult = {
      token: {
        ignored: true,
        type: 'UnicodeBOM',
        value: input,
      },
      remainingInput: ''
    }
    expect(actual).toEqual(expected)
  })

  describe('WhiteSpace', () => {
    it('should return the WhiteSpace', () => {
      const input = '\u0009'
      const actual = ignored.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'WhiteSpace',
          value: input,
        },
        remainingInput: '',
      }
      expect(actual).toEqual(expected)
    })

    it('should return the WhiteSpace', () => {
      const input = '\u0020'
      const actual = ignored.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'WhiteSpace',
          value: input,
        },
        remainingInput: '',
      }
      expect(actual).toEqual(expected)
    })
  })
})

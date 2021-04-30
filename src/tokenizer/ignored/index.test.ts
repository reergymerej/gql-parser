
import {GetTokenResult} from '../types'
import * as ignored from '.'

describe('ignored', () => {
  it('should return the UnicodeBOM', () => {
    const remainingInput = 'This stuff is not whiteSpace!'
    const input = `\uFEFF${remainingInput}`
    const actual = ignored.getToken(input)
    const expected: GetTokenResult = {
      token: {
        ignored: true,
        type: 'UnicodeBOM',
        value: '\uFEFF',
      },
      remainingInput,
    }
    expect(actual).toEqual(expected)
  })

  describe('WhiteSpace', () => {
    it('should return the WhiteSpace', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u0009${remainingInput}`
      const actual = ignored.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'WhiteSpace',
          value: '\u0009',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })

    it('should return the WhiteSpace', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u0020${remainingInput}`
      const actual = ignored.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'WhiteSpace',
          value: '\u0020',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })

  xdescribe('LineTerminator', () => {
    it('should return the LineTerminator', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u0009${remainingInput}`
      const actual = ignored.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'LineTerminator',
          value: '\u0009',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})

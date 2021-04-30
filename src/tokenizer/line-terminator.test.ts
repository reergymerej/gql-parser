import {GetTokenResult} from './types'
import * as lineTerminator from './line-terminator'

describe('LineTerminator', () => {
  describe('New Line (U+000A)', () => {
    it('should return the LineTerminator', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u000A${remainingInput}`
      const actual = lineTerminator.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'LineTerminator',
          value: '\u000A',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import * as lineTerminator from './line-terminator'
import {evaluate, LineTerminator} from './line-terminator'

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

  describe('Carriage Return (U+000D) [lookahead != New Line (U+000A)]', () => {
    it('should return the LineTerminator', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u000D${remainingInput}`
      const actual = lineTerminator.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'LineTerminator',
          value: '\u000D',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('Carriage Return (U+000D) New Line (U+000A)', () => {
    it('should return the LineTerminator', () => {
      const remainingInput = 'This stuff is not whiteSpace!'
      const input = `\u000D\u000A${remainingInput}`
      const actual = lineTerminator.getToken(input)
      const expected: GetTokenResult = {
        token: {
          ignored: true,
          type: 'LineTerminator',
          value: '\u000D\u000A',
        },
        remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })

  fdescribe('Evaluator', () => {
    it.each<null | string>([
      null,
      '\u000A',
    ])('should find %s', (prefix) => {
      const remainingInput = '#and the rest'
      const input = `${prefix === null ? '' : prefix}${remainingInput}`
      const actual = crawler(input, evaluate)
      const expectedValue = (prefix === null)
        ? null
        : {
          type: 'LineTerminator',
          value: prefix as LineTerminator['value'],
        } as LineTerminator
        const expected: CrawlerResult<LineTerminator> = [
          expectedValue,
          remainingInput,
        ]
        expect(actual).toEqual(expected)
    })
  })
})

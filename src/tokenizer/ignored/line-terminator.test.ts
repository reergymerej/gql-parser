import {crawler, CrawlerResult} from '../crawler'
import {evaluate, LineTerminator} from './line-terminator'

describe('LineTerminator', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '\u000A',
        '\u000A',
      ],
      [
        '\u000D',
        '\u000D',
      ],
      [
        '\u000D\u000A',
        '\u000D\u000A',
      ],
      [
        '',
        null,
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'LineTerminator',
          value: expectedValue as LineTerminator['value'],
        } as LineTerminator
      const expected: CrawlerResult<LineTerminator> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

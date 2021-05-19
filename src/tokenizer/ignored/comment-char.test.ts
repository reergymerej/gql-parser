import {crawler, CrawlerResult} from '../crawler'
import {evaluate, CommentChar} from './comment-char'

describe('CommentChar', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '\u0019\nboop',
        null,
      ],
      [
        'w\nboop',
        'w',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'CommentChar',
          value: expectedValue as CommentChar['value'],
        } as CommentChar
      const expected: CrawlerResult<CommentChar> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

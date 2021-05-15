import {crawler, CrawlerResult} from '../crawler'
import {evaluate, CommentChar} from './comment-char'

describe('CommentChar', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string, string]>([
      [
        '',
        null,
        '',
      ],
      [
        'weasel\nboop',
        'weasel',
        '\nboop',
      ],
      [
        'weasel\u0019\nboop',
        'weasel',
        '\u0019\nboop',
      ],
    ])('should find %s', (input, expectedValue, remainingInput) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'CommentChar',
          value: expectedValue as CommentChar['value'],
        } as CommentChar
      const expected: CrawlerResult<CommentChar> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})


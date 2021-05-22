import {crawler, CrawlerResult} from '../crawler'
import {evaluate, StringCharacter} from './string-character'

describe('StringCharacter', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '"',
        null,
      ],
      [
        '\\',
        null,
      ],
      [
        '\u000D',
        null,
      ],
      [
        'X',
        'X',
      ],
      [
        '\\u19aFxxxx',
        '\\u19aF',
      ],
      [
        '\\u19aFxxxx',
        '\\u19aF',
      ],
      [
        '\\bxxx',
        '\\b',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'StringCharacter',
          value: expectedValue as StringCharacter['value'],
        } as StringCharacter
      const expected: CrawlerResult<StringCharacter> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

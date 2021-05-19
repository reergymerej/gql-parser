import {crawler, CrawlerResult} from './crawler'
import {evaluate, SourceCharacter} from './source-character'

describe('SourceCharacter', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '\u0008',
        null,
      ],
      [
        '\u0009',
        '\u0009',
      ],
      [
        '!beep',
        '!',
      ],
      [
        'D',
        'D',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'SourceCharacter',
          value: expectedValue as SourceCharacter['value'],
        } as SourceCharacter
      const expected: CrawlerResult<SourceCharacter> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {evaluate, WhiteSpace} from './whitespace'

describe('WhiteSpace', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '\u0009beep',
        '\u0009',
      ],
      [
        '\u0020beep',
        '\u0020',
      ],
      [
        ' \u0020beep',
        ' ',
      ],
      [
        '\u0009\u0009',
        '\u0009',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'WhiteSpace',
          value: expectedValue as WhiteSpace['value'],
        } as WhiteSpace
      const expected: CrawlerResult<WhiteSpace> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

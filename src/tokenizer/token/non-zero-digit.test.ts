import {crawler, CrawlerResult} from '../crawler'
import {evaluate, NonZeroDigit} from './non-zero-digit'

describe('NonZeroDigit', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '0123',
        null,
      ],
      [
        '123',
        '1',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'NonZeroDigit',
          value: expectedValue as NonZeroDigit['value'],
        } as NonZeroDigit
      const expected: CrawlerResult<NonZeroDigit> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {evaluate, FractionalPart} from './fractional-part'

describe('FractionalPart', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '.',
        null,
      ],
      [
        '.x',
        null,
      ],
      [
        '.1',
        '.1',
      ],
      [
        '.',
        null,
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'FractionalPart',
          value: expectedValue as FractionalPart['value'],
        } as FractionalPart
      const expected: CrawlerResult<FractionalPart> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

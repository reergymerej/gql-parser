import {crawler, CrawlerResult} from '../crawler'
import {evaluate, IntegerPart} from './integer-part'

describe('IntegerPart', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '-0',
        '-0',
      ],
      [
        '-0L',
        '-0',
      ],
      [
        '0',
        '0',
      ],
      [
        '0L',
        '0',
      ],
      [
        '-1',
        '-1',
      ],
      [
        '-1L',
        '-1',
      ],
      [
        '1',
        '1',
      ],
      [
        '1L',
        '1',
      ],
      [
        '-19',
        '-19',
      ],
      [
        '-19L',
        '-19',
      ],
      [
        '19',
        '19',
      ],
      [
        '19L',
        '19',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'IntegerPart',
          value: expectedValue as IntegerPart['value'],
        } as IntegerPart
      const expected: CrawlerResult<IntegerPart> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../../crawler'
import {evaluate, FloatValue} from '.'

describe('FloatValue', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '0',
        null,
      ],
      [
        '0.1',
        '0.1'
      ],
      [
        '-0.1e23 ',
        '-0.1e23'
      ],
      [
        '2e+10',
        '2e+10',
      ],
      [
        '1.0',
        '1.0',
      ],
      [
        '1e50',
        '1e50',
      ],
      [
        '6.0221413e23 ',
        '6.0221413e23',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'FloatValue',
          value: expectedValue as FloatValue['value'],
        } as FloatValue
      const expected: CrawlerResult<FloatValue> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

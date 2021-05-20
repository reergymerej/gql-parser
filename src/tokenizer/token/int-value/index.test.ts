import {evaluate, IntValue} from '.'
import {crawler, CrawlerResult} from '../../crawler'

describe('IntValue', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '!beep',
        null,
      ],
      [
        '-2310035',
        '-2310035',
      ],
      [
        '231003X',
        '231003',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'IntValue',
          value: expectedValue as IntValue['value'],
        } as IntValue
      const expected: CrawlerResult<IntValue> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

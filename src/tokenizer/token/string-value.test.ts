import {crawler, CrawlerResult} from '../crawler'
import {evaluate, StringValue} from './string-value'

describe('StringValue', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      // [
      //   '!beep',
      //   '!',
      // ],
      // [
      //   '...!',
      //   '...',
      // ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'StringValue',
          value: expectedValue as StringValue['value'],
        } as StringValue
      const expected: CrawlerResult<StringValue> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {evaluate, Digit} from './digit'

describe('Digit', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '0123',
        '0',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Digit',
          value: expectedValue as Digit['value'],
        } as Digit
      const expected: CrawlerResult<Digit> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

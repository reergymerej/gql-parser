import {crawler, CrawlerResult} from '../crawler'
import {evaluate, Digit} from './digit'

describe('Digit', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string, string]>([
      [
        '',
        null,
        '',
      ],
      [
        '0123',
        '0',
        '123',
      ],
    ])('should find %s', (input, expectedValue, remainingInput) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Digit',
          value: expectedValue as Digit['value'],
        } as Digit
      const expected: CrawlerResult<Digit> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})

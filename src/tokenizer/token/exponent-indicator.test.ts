import {crawler, CrawlerResult} from '../crawler'
import {evaluate, ExponentIndicator} from './exponent-indicator'

describe('ExponentIndicator', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        'e',
        'e',
      ],
      [
        'E',
        'E',
      ],
      [
        'easdf',
        'e',
      ],
      [
        'Easdf',
        'E',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'ExponentIndicator',
          value: expectedValue as ExponentIndicator['value'],
        } as ExponentIndicator
      const expected: CrawlerResult<ExponentIndicator> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

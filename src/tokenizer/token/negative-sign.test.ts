import {crawler, CrawlerResult} from '../crawler'
import {evaluate, NegativeSign} from './negative-sign'

describe('NegativeSign', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string, string]>([
      [
        '',
        null,
        '',
      ],
      [
        '-beep',
        '-',
        'beep',
      ],
      [
        '--',
        '-',
        '-',
      ],
    ])('should find %s', (input, expectedValue, remainingInput) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'NegativeSign',
          value: expectedValue as NegativeSign['value'],
        } as NegativeSign
      const expected: CrawlerResult<NegativeSign> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})

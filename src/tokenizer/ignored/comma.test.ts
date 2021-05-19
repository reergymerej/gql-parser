import {crawler, CrawlerResult} from '../crawler'
import {evaluate, Comma} from './comma'

describe('Comma', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        ',beep',
        ',',
      ],
      [
        ',,',
        ',',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Comma',
          value: expectedValue as Comma['value'],
        } as Comma
      const expected: CrawlerResult<Comma> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

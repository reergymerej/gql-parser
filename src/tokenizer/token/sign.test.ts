import {crawler, CrawlerResult} from '../crawler'
import {evaluate, Sign} from './sign'

describe('Sign', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '-',
        '-',
      ],
      [
        '+',
        '+',
      ],
      [
        '-asdf',
        '-',
      ],
      [
        '+asdf',
        '+',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Sign',
          value: expectedValue as Sign['value'],
        } as Sign
      const expected: CrawlerResult<Sign> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {evaluate, UnicodeBOM} from './unicode-BOM'

describe('UnicodeBOM', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '\uFEFF123',
        '\uFEFF',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'UnicodeBOM',
          value: expectedValue as UnicodeBOM['value'],
        } as UnicodeBOM
      const expected: CrawlerResult<UnicodeBOM> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

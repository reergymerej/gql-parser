import {crawler, CrawlerResult} from '../crawler'
import {evaluate, EscapedCharacter} from './escaped-character'

describe('EscapedCharacter', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      ...('"\\/bfnrt'
        .split('')
        .map(x => [x, x] as [string, string]))
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'EscapedCharacter',
          value: expectedValue as EscapedCharacter['value'],
        } as EscapedCharacter
      const expected: CrawlerResult<EscapedCharacter> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

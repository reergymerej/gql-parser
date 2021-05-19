import {crawler, CrawlerResult} from '../crawler'
import {evaluate, Foo} from './foo'

describe('Foo', () => {
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
          type: 'Foo',
          value: expectedValue as Foo['value'],
        } as Foo
      const expected: CrawlerResult<Foo> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

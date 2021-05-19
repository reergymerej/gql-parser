import {crawler, CrawlerResult} from '../crawler'
import { evaluate, Punctuator } from './punctuator'

describe('Punctuator', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '!beep',
        '!',
      ],
      [
        '...!',
        '...',
      ],
      [
        '.',
        null,
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Punctuator',
          value: expectedValue as Punctuator['value'],
        } as Punctuator
      const expected: CrawlerResult<Punctuator> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

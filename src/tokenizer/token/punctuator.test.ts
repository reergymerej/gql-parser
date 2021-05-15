import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import punctuator, { evaluate, Punctuator } from './punctuator'

describe('Punctuator', () => {
  describe('negative test', () => {
    it('should NOT return the Punctuator', () => {
      const input = 'This is not a punctuator.'
      const actual = punctuator(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe.each([
    '!',
    '$',
    '(',
    ')',
    '...',
    ':',
    '=',
    '@',
    '[',
    ']',
    '{',
    '|',
    '}',
  ])('for the value %s', (head) => {
    it('should return the Punctuator', () => {
      const remainingInput = 'and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = punctuator(input)
      const expected: GetTokenResult = {
        token: {
          type: 'Punctuator',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('Evaluator', () => {
    it.each<[string, null | string, string]>([
      [
        '',
        null,
        '',
      ],
      [
        '!beep',
        '!',
        'beep',
      ],
      [
        '...!',
        '...',
        '!',
      ],
    ])('should find %s', (input, expectedValue, remainingInput) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Punctuator',
          value: expectedValue as Punctuator['value'],
        } as Punctuator
      const expected: CrawlerResult<Punctuator> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})

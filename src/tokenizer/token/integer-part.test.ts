import {GetTokenResult} from '../types'
import {crawler, CrawlerResult} from '../crawler'
import {evaluate, IntegerPart} from './integer-part'
import {getIntegerPart} from './integer-part'

describe('IntegerPart', () => {
  describe('NegativeSign (opt) 0', () => {
    it('should return the IntegerPart', () => {
      const head = '-0'
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = getIntegerPart(input)
      const expected: GetTokenResult = {
        token: {
          type: 'IntegerPart',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })

    it('should return the IntegerPart (no -)', () => {
      const head = '0'
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = getIntegerPart(input)
      const expected: GetTokenResult = {
        token: {
          type: 'IntegerPart',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })

    it('should return the IntegerPart', () => {
      const head = '0'
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = getIntegerPart(input)
      const expected: GetTokenResult = {
        token: {
          type: 'IntegerPart',
          value: head,
        },
        remainingInput: remainingInput,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('NegativeSign (opt) NonZeroDigit Digit (list, opt)', () => {
    it.each([
      // [false, ''],
      // [false, '-'],
      // [true, '3'],
      // [true, '-3'],
      [true, '34'],
      // [true, '-34'],
    ])('should return %s for %s', (isToken, head) => {
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = getIntegerPart(input)
      let expected: GetTokenResult
      if (!isToken) {
        expected = {
          remainingInput: input,
          token: null,
        }
      } else {
        expected = {
          token: {
            type: 'IntegerPart',
            value: head,
          },
          remainingInput: remainingInput,
        }
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
      // [
      //   '!beep',
      //   '!',
      //   'beep',
      // ],
      // [
      //   '...!',
      //   '...',
      //   '!',
      // ],
    ])('should find %s', (input, expectedValue, remainingInput) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'IntegerPart',
          value: expectedValue as IntegerPart['value'],
        } as IntegerPart
      const expected: CrawlerResult<IntegerPart> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})

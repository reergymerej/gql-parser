import {crawler, CrawlerResult} from '../crawler'
import {evaluate, ExponentPart} from './exponent-part'

describe('ExponentPart', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        'e',
        null
      ],
      [
        'e0',
        'e0',
      ],
      [
        'ex',
        null,
      ],
      [
        'e01',
        'e01',
      ],
      [
        'e12 ',
        'e12',
      ],
      [
        'E123',
        'E123',
      ],
      [
        'e-123',
        'e-123',
      ],
      [
        'E-123',
        'E-123',
      ],
      [
        'e+123',
        'e+123',
      ],
      [
        'E+123',
        'E+123',
      ],
      [
        'E+123 ',
        'E+123',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'ExponentPart',
          value: expectedValue as ExponentPart['value'],
        } as ExponentPart
      const expected: CrawlerResult<ExponentPart> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

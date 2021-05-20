import {crawler, CrawlerResult} from '../../crawler'
import {evaluate, FloatValue} from '.'

xdescribe('FloatValue', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      // [
      //   '',
      //   null,
      // ],
      [
        '-3360029.1230#blah', // one
        '-0.1230',
      ],
      // '2e+10', // two
      // '6.0221413e23', // IntegerPart FractionalPart ExponentPart
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'FloatValue',
          value: expectedValue as FloatValue['value'],
        } as FloatValue
      const expected: CrawlerResult<FloatValue> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

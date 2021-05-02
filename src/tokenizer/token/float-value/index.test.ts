import {GetTokenResult} from '../../types'
import floatValue from '../float-value'

describe('FloatValue', () => {
  describe('negative test', () => {
    it('should NOT return the FloatValue', () => {
      const input = '#This is not a FloatValue.'
      const actual = floatValue(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  xit('should return the FloatValue', () => {
    const head = '-1234.567e-9'
    const remainingInput = '#and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = floatValue(input)
    const expected: GetTokenResult = {
      token: {
        type: 'FloatValue',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

import {GetTokenResult} from '../types'
import stub from './stub-gettoken'

describe('Stub', () => {
  describe('negative test', () => {
    it('should NOT return the Stub', () => {
      const input = 'This is not a punctuator.'
      const actual = stub(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  xit('should return the Stub', () => {
    const head = 'XXX'
    const remainingInput = 'and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = stub(input)
    const expected: GetTokenResult = {
      token: {
        type: 'Stub',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

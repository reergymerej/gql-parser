import {GetTokenResult} from '../types'
import sign from './sign'

describe('Sign', () => {
  describe('negative test', () => {
    it('should NOT return the Sign', () => {
      const input = '#This is not a Sign.'
      const actual = sign(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  it.each([
    '+',
    '-',
  ])('should return the Sign for %s', (head) => {
    const remainingInput = '#and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = sign(input)
    const expected: GetTokenResult = {
      token: {
        type: 'Sign',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

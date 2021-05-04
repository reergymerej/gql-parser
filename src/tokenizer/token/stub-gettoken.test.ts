import {GetTokenResult} from '../types'
import stub from './stub-gettoken'

describe('Stub', () => {
  describe('negative tests', () => {
    it.each([
      '',
    ])('should not find a Stub for %s', (head) => {
      const remainingInput = '#and then other stuff'
      const input = `${head}${remainingInput}`
      const actual = stub(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  xdescribe('positive tests', () => {
    it.each([
      '+',
      '-',
    ])('should return the Stub for %s', (head) => {
      const remainingInput = '#and then other stuff'
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
})

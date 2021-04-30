import {GetTokenResult} from '../types'
import name from './name'

describe('Name', () => {
  describe('negative test', () => {
    it('should NOT return the Name', () => {
      const input = '# This is not a name.'
      const actual = name(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  it('should return the Name', () => {
    const head = 'Tosca'
    const remainingInput = '# and then other stuff'
    const input = `${head}${remainingInput}`
    const actual = name(input)
    const expected: GetTokenResult = {
      token: {
        type: 'Name',
        value: head,
      },
      remainingInput: remainingInput,
    }
    expect(actual).toEqual(expected)
  })
})

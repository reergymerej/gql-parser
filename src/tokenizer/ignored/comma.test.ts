import {GetTokenResult} from '../types'
import comma from './comma'

describe('Comma', () => {
  it('should NOT return the Comma', () => {
    const input = 'This is not a comma.'
    const actual = comma(input)
    const expected: GetTokenResult = {
      token: null,
      remainingInput: input,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the Comma', () => {
    const input = ',This is not a comma.'
    const actual = comma(input)
    const expected: GetTokenResult = {
      token: {
        type: 'Comma',
        ignored: true,
        value: ',',
      },
      remainingInput: 'This is not a comma.',
    }
    expect(actual).toEqual(expected)
  })
})

import {Ignored} from './types'
import * as ignored from './ignored'

describe('ignored', () => {
  it('should return the UnicodeBOM', () => {
    const input = '\uFEFF'
    const actual = ignored.getToken(input)
    const expected: Ignored = {
      ignored: true,
      type: 'UnicodeBOM',
      value: input,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the UnicodeBOM', () => {
    const input = '\uFEFF'
    const actual = ignored.getToken(input)
    const expected: Ignored = {
      ignored: true,
      type: 'UnicodeBOM',
      value: input,
    }
    expect(actual).toEqual(expected)
  })

  describe('WhiteSpace', () => {
    it('should return the WhiteSpace', () => {
      const input = '\u0009'
      const actual = ignored.getToken(input)
      const expected: Ignored = {
        ignored: true,
        type: 'WhiteSpace',
        value: input,
      }
      expect(actual).toEqual(expected)
    })

    it('should return the WhiteSpace', () => {
      const input = '\u0020'
      const actual = ignored.getToken(input)
      const expected: Ignored = {
        ignored: true,
        type: 'WhiteSpace',
        value: input,
      }
      expect(actual).toEqual(expected)
    })
  })
})

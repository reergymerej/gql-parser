import * as ignored from '.'
import * as util from '../util'
import comma from './comma'
import comment from './comment'
import lineTerminator from './line-terminator'
import unicodeBOM from './unicode-BOM'
import whiteSpace from './whitespace'
import {GetTokenResult} from '../types'

describe('terminals', () => {
  beforeEach(() => {
    jest.spyOn(util, 'getFirstTokenMatch')
  })

  it('should use the correct terminals', () => {
    try {
      ignored.getToken('1')
    } catch {}
    // Some of these are implicit with the tests below.  Some have been tested
    // in their own module, though.  This is really just checking that things
    // are wired correctly.
    expect(util.getFirstTokenMatch).toHaveBeenCalledWith([
      unicodeBOM,
      whiteSpace,
      lineTerminator,
      comment,
      comma,
    ])
  })
})

xdescribe('integration', () => {
  it('should return a bunch of tokens', () => {
    let input = `,
  # Look at all this sweet comment!
  ,
  # Look at all this sweet comment!
  \t\t
  # It is pretty cool.
    `

    const tokens = []
    console.log(input)
    while (input) {
      const r = ignored.getToken(input)
      tokens.push(r.token)
      input = r.remainingInput
      // console.log(input)
    }
    console.log(tokens)
  })
})

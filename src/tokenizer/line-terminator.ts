/*
LineTerminator ::
  New Line (U+000A)
  Carriage Return (U+000D)New Line (U+000A)
  Carriage Return (U+000D)New Line (U+000A)
*/

import {GetToken} from './types'
import {getFirstTokenMatch} from './util'

const one: GetToken = (input) => {
  const char = input[0]
  if (char === '\u000A') {
    const remainingInput = input.substring(1)
    return {
      token: {
        ignored: true,
        type: 'LineTerminator',
        value: char,
      },
      remainingInput,
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export const getToken: GetToken = (input) => {
  return getFirstTokenMatch([
    one,
  ])(input)
}

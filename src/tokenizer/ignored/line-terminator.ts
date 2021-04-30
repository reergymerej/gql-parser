/*
LineTerminator ::
  New Line (U+000A)
  Carriage Return (U+000D) [lookahead != New Line (U+000A)]
  Carriage Return (U+000D) New Line (U+000A)
*/

import {GetToken} from '../types'
import {getFirstTokenMatch} from '../util'

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

const two: GetToken = (input) => {
  const char = input[0]
  if (char === '\u000D' && input[1] !== '\u000A') {
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

const three: GetToken = (input) => {
  const head = input.substring(0, 2)
  if (head === '\u000D\u000A') {
    const remainingInput = input.substring(2)
    return {
      token: {
        ignored: true,
        type: 'LineTerminator',
        value: head,
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
    two,
    three,
  ])(input)
}

export default getToken

import {Evaluator} from '../crawler'
import {GetToken, GetTokenResult} from '../types'
import {getFirstTokenMatch} from '../util'

/*
LineTerminator ::
  New Line (U+000A)
  Carriage Return (U+000D) [lookahead != New Line (U+000A)]
  Carriage Return (U+000D) New Line (U+000A)
*/

export type LineTerminator = {
  type: 'LineTerminator',
  value: string
}

export const evaluate: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(1)
  const isFound = read === '\u0009'
     || read === '\u0020'
  if (isFound) {
    reader.consume(1)
  }
  const found: LineTerminator = {
    type: 'LineTerminator',
    value: read as LineTerminator['value'],
  }
  return isFound
    ? found
    : null
}

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

export const getToken: GetToken = function GetLineTerminator(input) {
  const getTokenResult: GetTokenResult | null = getFirstTokenMatch([
    one,
    two,
    three,
  ])(input)
  if (getTokenResult) {
    return getTokenResult
  }
  return {
    token: null,
    remainingInput: input
  }
}

export default getToken

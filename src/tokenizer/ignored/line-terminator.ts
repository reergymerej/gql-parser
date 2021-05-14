import {GetToken} from '../types'
import {crawler, EvaluationResult, Evaluator} from '../crawler'

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

export const one: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(1)
  const isFound = read === '\u000A'
  if (isFound) {
    const value = read as LineTerminator['value']
    reader.consume(value.length)
    const found: LineTerminator = {
      type: 'LineTerminator',
      value,
    }
    return found
  }
  return null
}

export const two: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(2)
  const isFound = read[0] === '\u000D'
    && read[1] !== '\u000A'
  if (isFound) {
    const value = read[0] as LineTerminator['value']
    reader.consume(value.length)
    const found: LineTerminator = {
      type: 'LineTerminator',
      value,
    }
    return found
  }
  return null
}

export const three: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(2)
  const isFound = read === '\u000D\u000A'
  if (isFound) {
    const value = read as LineTerminator['value']
    reader.consume(value.length)
    const found: LineTerminator = {
      type: 'LineTerminator',
      value,
    }
    return found
  }
  return null
}

export const evaluate: Evaluator<LineTerminator> = (reader) => {
  const checks: Evaluator<LineTerminator>[] = [
    three,
    two,
    one,
  ]
  let found: EvaluationResult<LineTerminator> = null
  for (const check of checks) {
    found = check(reader)
    if (found) {
      break
    }
  }
  return found
}

export const getToken: GetToken = function GetLineTerminator(input) {
  const [
    found,
    remainingInput,
  ] = crawler(input, evaluate)

  if (found) {
    return {
      token: {
        ignored: true,
        type: found.type,
        value: found?.value,
      },
      remainingInput,
    }
  }
  return {
    token: found,
    remainingInput,
  }
}

export default getToken

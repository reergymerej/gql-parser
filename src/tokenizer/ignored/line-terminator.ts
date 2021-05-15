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

const isOne = (input: string): boolean => {
  return input === '\u000A'
}

export const one: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(1)
  const isFound = isOne(read)
  if (isFound) {
    const value = read as LineTerminator['value']
    const found: LineTerminator = {
      type: 'LineTerminator',
      value,
    }
    return found
  }
  return null
}

const isTwo = (input: string): boolean => {
  return input[0] === '\u000D'
    && input[1] !== '\u000A'
}

export const two: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(2)
  const isFound = isTwo(read)
  if (isFound) {
    const value = read[0] as LineTerminator['value']
    const found: LineTerminator = {
      type: 'LineTerminator',
      value,
    }
    return found
  }
  return null
}

const isThree = (input: string): boolean => {
  return input === '\u000D\u000A'
}

export const three: Evaluator<LineTerminator> = (reader) => {
  const read = reader.read(2)
  const isFound = isThree(read)
  if (isFound) {
    const value = read as LineTerminator['value']
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
      reader.consume(found.value.length)
      break
    }
  }
  return found
}

export const isLineTerminator = (input: string): boolean => {
  return isThree(input.substring(0, 2))
    || isTwo(input.substring(0, 2))
    || isOne(input.substring(0, 1))
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

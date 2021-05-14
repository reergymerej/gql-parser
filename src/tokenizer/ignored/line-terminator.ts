import {GetToken} from '../types'
import {crawler, Evaluator} from '../crawler'

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
  let read = reader.read(1)
  if (read === '\u000A') {
    reader.consume(1)
    const found: LineTerminator = {
      type: 'LineTerminator',
      value: read as LineTerminator['value'],
    }
    return found
  } else if (read === '\u000D') {
    read = reader.read(2)
    if (read === '\u000D\u000A') {
      reader.consume(2)
      const found: LineTerminator = {
        type: 'LineTerminator',
        value: read as LineTerminator['value'],
      }
      return found
    } else {
      read = reader.read(1)
      reader.consume(1)
      const found: LineTerminator = {
        type: 'LineTerminator',
        value: read as LineTerminator['value'],
      }
      return found
    }
  }

  return null
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

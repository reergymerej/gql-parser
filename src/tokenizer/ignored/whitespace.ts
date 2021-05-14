import {crawler, Evaluator} from '../crawler'
import {GetToken} from '../types'

/*
WhiteSpace ::
  Horizontal Tab (U+0009)
  Space (U+0020)
*/

export type WhiteSpace = {
  type: 'WhiteSpace',
  value: '\u0009' | '\u0020',
}

export const evaluate: Evaluator<WhiteSpace> = (reader) => {
  const read = reader.read(1)
  const isFound = read === '\u0009'
     || read === '\u0020'
  if (isFound) {
    reader.consume(1)
  }
  const found: WhiteSpace = {
    type: 'WhiteSpace',
    value: read as WhiteSpace['value'],
  }
  return isFound
    ? found
    : null
}

const getToken: GetToken = function GetWhiteSpace(input) {
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

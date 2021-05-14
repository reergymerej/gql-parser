/*
UnicodeBOM ::
  Byte Order Mark (U+FEFF)
*/

import {crawler, Evaluator} from '../crawler'
import {GetToken} from '../types'

export type UnicodeBOM = {
  type: 'UnicodeBOM',
  value: '\uFEFF',
}

export const evaluate: Evaluator<UnicodeBOM> = (reader) => {
  const read = reader.read(1)
  const isFound = read === '\uFEFF'
  if (isFound) {
    reader.consume(1)
  }
  const found: UnicodeBOM = {
    type: 'UnicodeBOM',
    value: '\uFEFF',
  }
  return isFound
    ? found
    : null
}

const getToken: GetToken = function GetUnicodeBOM(input) {
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

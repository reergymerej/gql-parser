import {crawler, Evaluator} from '../crawler'
import {GetToken} from '../types'

/*
   Comma::
   ,
 */

export type Comma = {
  type: 'Comma',
  value: ',',
}
export const evaluate: Evaluator<Comma> = (reader) => {
  const read = reader.read(1)
  const isFound = read === ','
  if (isFound) {
    reader.consume(1)
  }
  const found: Comma = {
    value: ',',
    type: 'Comma',
  }
  return isFound
    ? found
    : null
}

const getToken: GetToken = (input) => {
  const [
    found,
    remainingInput,
  ] = crawler(input, evaluate)

  if (found) {
    return {
      token: {
        ignored: true,
        type: 'Comma',
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

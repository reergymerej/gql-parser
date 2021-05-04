import {GetToken} from '../types'
import {findWhileIsDigit} from './digit'

/*
FractionalPart ::
  . Digit (list)
*/

const getToken: GetToken = function FractionalPart(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (head === '.') {
    const digitsResult = findWhileIsDigit(tail)
    const value = `${head}${digitsResult.result}`
    const remainingInput = tail.substring(digitsResult.index)
    return {
      token: {
          type: 'FractionalPart',
          value,
      },
      remainingInput,
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken


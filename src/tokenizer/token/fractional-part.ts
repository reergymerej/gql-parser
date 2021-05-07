import {GetToken} from '../types'
import {findWhile, getWhile} from '../util'
import {findWhileIsDigit} from './digit'

/*
FractionalPart ::
  . Digit (list)
*/

const getToken: GetToken = function FractionalPart(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (head === '.') {
    const digits = getWhile(tail, findWhileIsDigit)
    if (digits.value.length) {
      const value = `${head}${digits.value}`
      const remainingInput = digits.remainingInput
      return {
        token: {
            type: 'FractionalPart',
            value,
        },
        remainingInput,
      }
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken

// TODO: implement
const isFractionalPart = () => true
export const findWhileIsFractionalPart = findWhile(isFractionalPart)

import {GetToken} from '../types'
import {getWhile} from '../util'
import {findWhileIsDigit} from './digit'
import {findWhileIsExponentIndicator} from './exponent-indicator'

/*
ExponentPart ::
  ExponentIndicator Sign (opt) Digit (list)
*/

const getToken: GetToken = function ExponentPart(input) {
  const exponentIndicator = getWhile(input, findWhileIsExponentIndicator)
  if (exponentIndicator.value) {
    const tail = exponentIndicator.remainingInput
    const digits = getWhile(tail, findWhileIsDigit)
    if (digits.value.length) {
      const value = `${exponentIndicator.value}${digits.value}`
      const remainingInput = digits.remainingInput
      return {
        token: {
            type: 'ExponentPart',
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


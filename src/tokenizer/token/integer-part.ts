import {GetToken} from '../types'
import {findWhileIsDigit, isDigit} from './digit'
import {findWhileNegativeSign} from './negative-sign'

/*
IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

const getNegativeSign = (input: string): string => {
  return findWhileNegativeSign(input).result
}

export const getIntegerPart: GetToken = (input) => {
  const negativeSign = getNegativeSign(input)
  const next = input[negativeSign.length]
  const isZero = next === '0'
  let value = `${negativeSign}${next}`
  let remainingInput = input.substring(value.length)
  if (isDigit(next)) {
    if (isZero) {
      return {
        token: {
            type: 'IntegerPart',
            value,
        },
        remainingInput,
      }
    } else {
      const digitsResult = findWhileIsDigit(remainingInput)
      value = `${value}${digitsResult.result}`
      remainingInput = remainingInput.substring(digitsResult.index)
      return {
        token: {
            type: 'IntegerPart',
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

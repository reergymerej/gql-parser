import {GetToken, GetTokenResult, Token} from '../../types'
import {findWhile} from '../../util'

/*
IntValue ::
  IntegerPart

IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)

NegativeSign ::
-

Digit :: one of
  0 1 2 3 4 5 6 7 8 9

NonZeroDigit ::
  Digit but not 0
*/

const isIntValue = (char: string): boolean => {
  return false
}

export const isNegativeSign = (char: string): boolean => {
  return char === '-'
}

export const isDigit = (char: string): boolean => {
  return [ '0' ,
    '1' ,
    '2' ,
    '3' ,
    '4' ,
    '5' ,
    '6' ,
    '7' ,
    '8' ,
    '9',
  ].includes(char)
}

export const isNonZeroDigit = (char: string): boolean => {
  return char !== '0' && isDigit(char)
}

const findWhileNegativeSign = findWhile(isNegativeSign)

const findWhileIsDigit = findWhile(isDigit)

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

interface WithToken {
  token: Token,
}
type ChangeType = (result: GetTokenResult & WithToken, type: string) => GetTokenResult

const changeType: ChangeType = (getTokenResult, type) => {
  return {
    ...getTokenResult,
    token: {
      ...getTokenResult.token,
      type: 'IntValue',
    },
  }
}

const getToken: GetToken = function IntValue(input) {
  const integerPart = getIntegerPart(input)
  if (integerPart.token) {
    return {
      ...integerPart,
      token: {
        ...integerPart.token,
        type: 'IntValue',
      },
    }
  }
  return integerPart
}

export default getToken


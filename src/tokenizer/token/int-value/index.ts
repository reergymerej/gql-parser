import {GetToken} from '../../types'
import {getIntegerPart} from './integer-part'

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

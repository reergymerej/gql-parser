import {GetToken} from '../../types'
import {getIntegerPart} from './integer-part'

/*
IntValue ::
  IntegerPart

IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

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

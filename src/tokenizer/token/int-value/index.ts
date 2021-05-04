import {GetToken} from '../../types'
import {getIntegerPart} from '../integer-part'

/*
IntValue ::
  IntegerPart
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

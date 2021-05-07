import {Count} from '../../../types'
import {GetToken, GetTokenResult} from '../../types'
import {getFirstTokenMatch, Requirement} from '../../util'
import {findWhileIsExponentPart} from '../exponent-part'
import {findWhileIsFractionalPart} from '../fractional-part'
import {findWhileIsIntegerPart} from '../integer-part'

/*
FloatValue ::
  IntegerPart FractionalPart
  IntegerPart ExponentPart
  IntegerPart FractionalPart ExponentPart
*/

// IntegerPart FractionalPart ExponentPart
const three: GetToken = (input) => {
  const requirements: Requirement[] = [
    {
      finder: findWhileIsIntegerPart,
      count: Count.ONE,
    },
    {
      finder: findWhileIsFractionalPart,
      count: Count.ONE,
    },
    {
      finder: findWhileIsExponentPart,
      count: Count.ONE,
    },
  ]

}

const getToken: GetToken = function FloatValue(input) {
  const getTokenResult: GetTokenResult | null = getFirstTokenMatch([
    three,
  ])(input)
  if (getTokenResult) {
    return getTokenResult
  }
  return {
    token: null,
    remainingInput: input
  }
}

export default getToken


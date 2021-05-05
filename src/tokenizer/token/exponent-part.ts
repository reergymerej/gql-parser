import {GetToken} from '../types'
import {assembler, Count, Requirement} from '../util'
import {findWhileIsDigit} from './digit'
import {findWhileIsExponentIndicator} from './exponent-indicator'
import {findWhileIsSign} from './sign'

/*
ExponentPart ::
  ExponentIndicator Sign (opt) Digit (list)
*/

const getToken: GetToken = function ExponentPart(input) {
  const requirements: Requirement[] = [
    {
      finder: findWhileIsExponentIndicator,
      count: Count.ONE,
    },
    {
      finder: findWhileIsSign,
      count: Count.ONE_OR_FEWER,
    },
    {
      finder: findWhileIsDigit,
      count: Count.ONE_OR_MORE,
    },
  ]
  return assembler(
    requirements,
    input,
    'ExponentPart',
  )
}

export default getToken

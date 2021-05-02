import {GetToken, GetTokenResult} from '../../types'
import {getFirstTokenMatch} from '../../util'

/*
FloatValue ::
  IntegerPart FractionalPart
  IntegerPart ExponentPart
  IntegerPart FractionalPart ExponentPart

FractionalPart ::
  . Digit (list)

ExponentPart ::
  ExponentIndicator Sign (opt) Digit (list)
*/

// IntegerPart FractionalPart ExponentPart
const three: GetToken = (input) => {
  const char = input[0]
  if (char === '\u000A') {
    const remainingInput = input.substring(1)
    return {
      token: {
        ignored: true,
        type: 'LineTerminator',
        value: char,
      },
      remainingInput,
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
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


import {GetToken} from '../types'

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

const getToken: GetToken = function IntValue(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (isIntValue(head)) {
    return {
      token: {
          type: 'IntValue',
          value: head,
      },
      remainingInput: tail,
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken


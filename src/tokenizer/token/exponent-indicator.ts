import {GetToken} from '../types'

/*
ExponentIndicator ::
  e E
*/

const isExponentIndicator = (char: string): boolean => {
  return [
    'e',
    'E',
  ].includes(char)
}

const getToken: GetToken = function ExponentIndicator(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (isExponentIndicator(head)) {
    return {
      token: {
          type: 'ExponentIndicator',
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



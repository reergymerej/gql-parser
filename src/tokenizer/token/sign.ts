import {GetToken} from '../types'
import {findWhile} from '../util'

/*
Sign :: one of
  + -
*/

const isSign = (char: string): boolean => {
  return char === '+'
  || char === '-'
}

const getToken: GetToken = function Sign(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (isSign(head)) {
    return {
      token: {
          type: 'Sign',
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


export const findWhileIsSign = findWhile(isSign)

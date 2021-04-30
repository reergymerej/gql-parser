import {GetToken} from '../types'

/*
Stub :: one of
*/

const isStub = (char: string): boolean => {
  return false
}

const getToken: GetToken = function Stub(input) {
  const head = input[0]
  const tail = input.slice(1)
  if (isStub(head)) {
    return {
      token: {
          type: 'Stub',
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


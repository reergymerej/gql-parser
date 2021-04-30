import {GetToken} from '../types'

/*
Comma::
  ,
*/

const getToken: GetToken = (input) => {
  const head = input[0]
  const tail = input.slice(1)
  if (head === ',') {
    return {
      token: {
          ignored: true,
          type: 'Comma',
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

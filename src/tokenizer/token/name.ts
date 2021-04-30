import {GetToken} from '../types'
import {findWhile} from '../util'

// Name ::
//   /[_A-Za-z][_0-9A-Za-z]*/

const isName = (input: string): boolean => {
  return /[_A-Za-z][_0-9A-Za-z]*/.test(input)
}

const findWhileIsName = findWhile(isName)

const getToken: GetToken = function Name(input) {
  const { index, result } = findWhileIsName(input)
  const head = result
  const tail = input.slice(index)
  if (head) {
    return {
      token: {
          type: 'Name',
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


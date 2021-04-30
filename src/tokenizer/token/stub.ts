import {GetToken} from '../types'

export const getToken: GetToken = function Stub(input) {
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken

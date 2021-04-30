/*
UnicodeBOM ::
  Byte Order Mark (U+FEFF)
*/

import {GetToken} from '../types'

const getToken: GetToken = function GetUnicodeBOM(input) {
  const BOM = '\uFEFF'
  const char = input[0]
  if (char === BOM) {
    const remainingInput = input.substring(1)
    return {
      token: {
        ignored: true,
        type: 'UnicodeBOM',
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

export default getToken

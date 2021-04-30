/*
WhiteSpace ::
  Horizontal Tab (U+0009)
  Space (U+0020)
*/

import {GetToken} from "../types"

const getToken: GetToken = (input) => {
  const char = input[0]
  const isMatch = [
    '\u0009',
    '\u0020',
  ].includes(char)
  if (isMatch) {
    const remainingInput = input.substring(1)
    return {
      token: {
        ignored: true,
        type: 'WhiteSpace',
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
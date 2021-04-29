import {GetToken} from './types'
import {getFirstTokenMatch} from './util'

/*
Ignored ::
  UnicodeBOM
  WhiteSpace
  LineTerminator
  Comment
  Comma

UnicodeBOM ::
  Byte Order Mark (U+FEFF)

WhiteSpace ::
  Horizontal Tab (U+0009)
  Space (U+0020)
*/

const unicodeBOM: {
  getToken: GetToken,
} = {
  getToken: (input) => {
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
  },
}

const whiteSpace: {
  getToken: GetToken,
} = {
  getToken: (input) => {
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
  },
}

export const getToken: GetToken = (input) => {
  return getFirstTokenMatch([
    unicodeBOM.getToken,
    whiteSpace.getToken,
  ])(input)
}

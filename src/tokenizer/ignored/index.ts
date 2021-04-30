import {GetToken} from '../types'
import {getFirstTokenMatch} from '../util'
import whiteSpace from './whitespace'

/*
Ignored ::
  UnicodeBOM
  WhiteSpace
  LineTerminator
  Comment
  Comma

UnicodeBOM ::
  Byte Order Mark (U+FEFF)
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

export const getToken: GetToken = (input) => {
  return getFirstTokenMatch([
    unicodeBOM.getToken,
    whiteSpace,
  ])(input)
}

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
    if (input === BOM) {
      return {
        token: {
          ignored: true,
          type: 'UnicodeBOM',
          value: input,
        },
        remainingInput: '',
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
    return [
      '\u0009',
      '\u0020',
    ].includes(input)
      ? {
        token: {
          ignored: true,
          type: 'WhiteSpace',
          value: input,
        },
        remainingInput: '',
      }
        : {
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

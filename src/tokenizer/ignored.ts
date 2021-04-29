import {GetToken, Ignored} from './types'

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
    return input === BOM
    ? {
      ignored: true,
      type: 'UnicodeBOM',
      value: input,
    }
    : null
  }
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
      ignored: true,
      type: 'WhiteSpace',
      value: input,
    }
    : null
  }
}

export const getToken: GetToken = (input) => {
  return unicodeBOM.getToken(input)
    || whiteSpace.getToken(input)
}

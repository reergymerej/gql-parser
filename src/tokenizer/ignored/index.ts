/*
Ignored ::
  UnicodeBOM
  WhiteSpace
  LineTerminator
  Comment
  Comma
*/

import comment from './comment'
import lineTerminator from './line-terminator'
import unicodeBOM from './unicode-BOM'
import whiteSpace from './whitespace'
import {GetToken} from '../types'
import {getFirstTokenMatch} from '../util'

export const getToken: GetToken = (input) => {
  return getFirstTokenMatch([
    unicodeBOM,
    whiteSpace,
    lineTerminator,
    comment,
  ])(input)
}
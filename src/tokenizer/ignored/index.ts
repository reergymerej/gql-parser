import comma from './comma'
import comment from './comment'
import lineTerminator from './line-terminator'
import unicodeBOM from './unicode-BOM'
import whiteSpace from './whitespace'
import {GetToken, GetTokenResult} from '../types'
import {getFirstTokenMatch} from '../util'

/*
https://spec.graphql.org/June2018/#sec-Appendix-Grammar-Summary.Ignored-Tokens

Ignored ::
  UnicodeBOM
  WhiteSpace
  LineTerminator
  Comment
  Comma
*/

export const getToken: GetToken = (input) => {
  const getTokenResult: GetTokenResult | null =
    getFirstTokenMatch([
      unicodeBOM,
      whiteSpace,
      lineTerminator,
      comment,
      comma,
    ])(input)
  if (getTokenResult) {
    return getTokenResult
  }
  return {
    token: null,
    remainingInput: input
  }
}

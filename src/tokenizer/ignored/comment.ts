/*
Comment ::
  # CommentChar (list, opt)

CommentChar ::
  SourceCharacter but not LineTerminator
*/

import {GetToken} from "../types"
import {findWhile, Predicate} from "../util"
import lineTerminator from './line-terminator'

/*
SourceCharacter ::
  /[\u0009\u000A\u000D\u0020-\uFFFF]/
*/

const isToken = (getToken: GetToken): boolean => {
  let isThisTypeOfToken: boolean = false
  try {
    isThisTypeOfToken = lineTerminator(input).token !== null
  } catch {}
  return isThisTypeOfToken
}

const isCommentChar: Predicate = input => {
  const isSourceChar =  /[\u0009\u000A\u000D\u0020-\uFFFF]/.test(input)
  let isLineTerminator: boolean = false
  try {
    isLineTerminator = lineTerminator(input).token !== null
  } catch {}
  return isSourceChar && !isLineTerminator
}

const findWhileCommentChar = findWhile(isCommentChar)

const getToken: GetToken = (input) => {
  const head = input[0]
  const tail = input.slice(1)
  if (head === '#') {
    // We need to step through until we stop finding CommentChar.
    const findResult = findWhileCommentChar(tail)
    return {
      token: {
          type: 'Comment',
          ignored: true,
          value: `${head}${findResult.result}`,
      },
      remainingInput: input.substring(findResult.index + 1),
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken

/*
Comment ::
  # CommentChar (list, opt)

CommentChar ::
  SourceCharacter but not LineTerminator
*/

import {GetToken} from '../types'
import {findWhile, Predicate} from '../util'
import lineTerminator from './line-terminator'

/*
SourceCharacter ::
  /[\u0009\u000A\u000D\u0020-\uFFFF]/
*/

const isToken = (getToken: GetToken) => (input: string): boolean => {
  let isThisTypeOfToken = false
  try {
    isThisTypeOfToken = getToken(input).token !== null
  } catch {}
  return isThisTypeOfToken
}

const isLineTerminator = isToken(lineTerminator)

const isCommentChar: Predicate = input => {
  // eslint-disable-next-line no-control-regex
  const isSourceChar =  /[\u0009\u000A\u000D\u0020-\uFFFF]/.test(input)
  return isSourceChar && !isLineTerminator(input)
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

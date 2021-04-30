import {isSourceChar} from '../source-character'
import {GetToken} from '../types'
import {findWhile, isToken, Predicate} from '../util'
import lineTerminator from './line-terminator'

/*
Comment ::
  # CommentChar (list, opt)

CommentChar ::
  SourceCharacter but not LineTerminator
*/

const isLineTerminator = isToken(lineTerminator)

const isCommentChar: Predicate = input => {
  return isSourceChar(input) && !isLineTerminator(input)
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

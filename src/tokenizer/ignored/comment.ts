import {Count} from '../../types'
import {isSourceChar} from '../source-character'
import {GetToken} from '../types'
import {assembler, findWhileByCharacter, isToken, Predicate, Requirement} from '../util'
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
const isPound: Predicate = input => {
  return input === '#'
}
const findWhileCommentChar = findWhileByCharacter(isCommentChar)
const findWhileIsPound = findWhileByCharacter(isPound)

const getToken: GetToken = (input) => {
  const requirements: Requirement[] = [
    {
      count: Count.ONE,
      finder: findWhileIsPound,
    },
    {
      count: Count.ANY,
      finder: findWhileCommentChar,
    },
  ]
  const assembled = assembler(
    requirements,
    input,
    'Comment',
  )
  if (assembled.token) {
    assembled.token.ignored = true
  }
  return assembled
}

export default getToken

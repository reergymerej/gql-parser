import {Evaluator, getReader} from '../crawler'
import {findIndex} from '../util'
import * as commentChar from './comment-char'

/*
Comment ::
  # CommentChar (list, opt)
*/

export type Comment = {
  type: 'Comment',
  value: string
}

export const isComment = (value: string): boolean => {
  return value[0] === '#'
}

export const evaluate: Evaluator<Comment> = (reader) => {
  const value = reader.read(1)
  if (isComment(value)) {
    const endOffset = value.length
    const endReader = getReader(reader.from(endOffset))
    const endIndex = findIndex(endReader, commentChar.isCommentChar)
    const full = (endIndex > -1)
      ? reader.read(endIndex + endOffset)
      : reader.read(endOffset)
    const found: Comment = {
      type: 'Comment',
      value: full as Comment['value'],
    }
    return found
  }
  return null
}

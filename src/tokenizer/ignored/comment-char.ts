import * as sourceCharacter from '../source-character'
import {Evaluator, getReader} from '../crawler'
import * as lineTerminator from './line-terminator'
import {StringPredicate} from '../types'

/*
CommentChar ::
  SourceCharacter but not LineTerminator
*/

export type CommentChar = {
  type: 'CommentChar',
  value: string
}

export const isCommentChar: StringPredicate = value => {
  const reader = getReader(value)
  const result = evaluate(reader)
  return result !== null
}

export const evaluate: Evaluator<CommentChar> = (reader) => {
  const value = sourceCharacter.evaluate(reader)
  if (value) {
    const sourceCharacterValue = value.value
    const isLineTerminator = lineTerminator.isLineTerminator(sourceCharacterValue)
    if (!isLineTerminator) {
      const found: CommentChar = {
        type: 'CommentChar',
        value: sourceCharacterValue as CommentChar['value'],
      }
      return found
    }
  }
  return null
}

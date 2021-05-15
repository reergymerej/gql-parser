import {isSourceChar} from '../source-character'
import {GetToken} from '../types'
import {crawler, EvaluationResult, Evaluator} from '../crawler'

/*
Comment ::
  # CommentChar (list, opt)

CommentChar ::
  SourceCharacter but not Comment
*/

export type SourceCharacter = {
  type: 'SourceCharacter',
  value: string
}

export type Comment = {
  type: 'Comment',
  value: string
}

const sourceChar: Evaluator<SourceCharacter> = (reader) => {
  let read = ''
  let allLength = reader.all().length
  let good = ''
  while (allLength--) {
    read = reader.read(read.length + 1)
    const lastRead = read[read.length - 1]
    const lastReadIsSourceChar = isSourceChar(lastRead)
    if (lastReadIsSourceChar) {
      good += lastRead
    } else {
      break
    }
  }
  const isFound = good !== ''
  if (isFound) {
    const value = good as SourceCharacter['value']
    reader.consume(value.length)
    const found: SourceCharacter = {
      type: 'SourceCharacter',
      value,
    }
    return found
  }
  return null
}

export const evaluate: Evaluator<Comment> = (reader) => {
  const head = reader.read(1)
  const isFound = head === '#'
  if (isFound) {
    let value = head as Comment['value']
    reader.consume(head.length)
    const tail = sourceChar(reader)
    const tailValue = tail === null ? '' : tail.value
    value = `${head}${tailValue}` as Comment['value']
    const found: Comment = {
      type: 'Comment',
      value,
    }
    return found
  }
  return null
}


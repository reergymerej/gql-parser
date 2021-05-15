import {isSourceChar} from '../source-character'
import {Evaluator} from '../crawler'
import {isLineTerminator} from './line-terminator'

/*
CommentChar ::
  SourceCharacter but not LineTerminator
*/

export type CommentChar = {
  type: 'CommentChar',
  value: string
}

export const evaluate: Evaluator<CommentChar> = (reader) => {
  let read = ''
  let allLength = reader.all().length
  let good = ''
  while (allLength--) {
    read = reader.read(read.length + 1)
    const lastRead = read[read.length - 1]
    const lastReadIsSourceChar = isSourceChar(lastRead)
    const lastReadIsLineTerminator = isLineTerminator(lastRead)
    const isGood = lastReadIsSourceChar && !lastReadIsLineTerminator
    if (isGood) {
      good += lastRead
    } else {
      break
    }
  }
  const isFound = good !== ''
  if (isFound) {
    const value = good as CommentChar['value']
    reader.consume(value.length)
    const found: CommentChar = {
      type: 'CommentChar',
      value,
    }
    return found
  }
  return null
}

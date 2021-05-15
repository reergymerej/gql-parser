import {GetToken} from '../types'
import {crawler, Evaluator} from '../crawler'
import * as commentChar from './comment-char'

/*
Comment ::
  # CommentChar (list, opt)
*/

export type Comment = {
  type: 'Comment',
  value: string
}

export const evaluate: Evaluator<Comment> = (reader) => {
  const head = reader.read(1)
  const isFound = head === '#'
  if (isFound) {
    let value = head as Comment['value']
    reader.consume(head.length)
    const tail = commentChar.evaluate(reader)
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

export const getToken: GetToken = function GetLineTerminator(input) {
  const [
    found,
    remainingInput,
  ] = crawler(input, evaluate)
  if (found) {
    return {
      token: {
        ignored: true,
        type: found.type,
        value: found?.value,
      },
      remainingInput,
    }
  }
  return {
    token: found,
    remainingInput,
  }
}

export default getToken

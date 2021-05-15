import {GetToken} from '../types'
import {crawler, Evaluator} from '../crawler'

/*
Punctuator :: one of
  ! $ ( ) ... : = @ [ ] { | }
*/

export type Punctuator = {
  type: 'Punctuator',
  value: string
}

const punctuators = [
  '!',
  '$',
  '(',
  ')',
  '...',
  ':',
  '=',
  '@',
  '[',
  ']',
  '{',
  '|',
  '}',
]

const isPunctuator = (value: string): boolean => {
  return punctuators.includes(value)
}

export const evaluate: Evaluator<Punctuator> = (reader) => {
  let value = ''
  const short = reader.read(1)
  let isFound = isPunctuator(short)
  if (isFound) {
    value = short as Punctuator['value']
  } else {
    const long = reader.read(3)
    isFound = isPunctuator(long)
    if (isFound) {
      value = long as Punctuator['value']
    }
  }

  if (isFound) {
    reader.consume(value.length)
    const found: Punctuator = {
      type: 'Punctuator',
      value,
    }
    return found
  }
  return null
}

const getToken: GetToken = function Punctuator(input) {
  const [
    found,
    remainingInput,
  ] = crawler(input, evaluate)

  if (found) {
    return {
      token: {
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

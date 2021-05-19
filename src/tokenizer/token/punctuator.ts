import {Evaluator} from '../crawler'

/*
Punctuator :: one of
  ! $ ( ) ... : = @ [ ] { | }
*/

export type Punctuator = {
  type: 'Punctuator',
  value:
    | '!'
    | '$'
    | '('
    | ')'
    | '...'
    | ':'
    | '='
    | '@'
    | '['
    | ']'
    | '{'
    | '|'
    | '}'
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
  let value = reader.read(3)
  if (isPunctuator(value)) {
    const found: Punctuator = {
      type: 'Punctuator',
      value: value as Punctuator['value'],
    }
    return found
  }
  value = reader.read(1)
  if (isPunctuator(value)) {
    const found: Punctuator = {
      type: 'Punctuator',
      value: value as Punctuator['value'],
    }
    return found
  }
  return null
}

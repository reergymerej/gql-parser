import {Token, GetToken} from './types'

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

const isPunctuator = (char: string): boolean => {
  return punctuators.includes(char)
}

export const getToken: GetToken = (input) => {
}

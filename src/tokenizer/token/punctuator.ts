import {GetToken} from '../types'

/*
Punctuator :: one of
  ! $ ( ) ... : = @ [ ] { | }
*/
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

const getToken: GetToken = function Punctuator(input) {
  if (input.indexOf('...') === 0) {
    const tail = input.slice(3)
    return {
      token: {
          type: 'Punctuator',
          value: '...',
      },
      remainingInput: tail,
    }
  }
  const head = input[0]
  const tail = input.slice(1)
  if (isPunctuator(head)) {
    return {
      token: {
          type: 'Punctuator',
          value: head,
      },
      remainingInput: tail,
    }
  }
  return {
    token: null,
    remainingInput: input,
  }
}

export default getToken


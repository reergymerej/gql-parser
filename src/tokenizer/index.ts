type Punctuator =
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

type Name       = string
type IntValue   = any
type FloatValue = any
type StringValue = any

// https://spec.graphql.org/June2018/#sec-Source-Text.Lexical-Tokens
export type Token =
  | Punctuator
  | Name
  | IntValue
  | FloatValue
  | StringValue

type UnicodeBOM = any
type WhiteSpace = any
type LineTerminator = any
type Comment = any
type Comma = any

// Before and after every lexical token may be any amount of ignored tokens
type Ignored =
  | UnicodeBOM
  | WhiteSpace
  | LineTerminator
  | Comment
  | Comma


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

const nameRegex = /[_A-Za-z][_0-9A-Za-z]*/


const BOM = '\uFEFF'

const whitespace = [
  '\u0009', // \t
  '\u0020', // space
]

const lineTerminators = [
  '\u000A',  // \n
  '\u000D',  // \r
  '\u000D\u000A',  // \r\n
]

const lineTerminatorJoined = lineTerminators.join('|')

const insignificantComma = ','

// all code points starting with the # character up to but not including the
// line terminator.
const commentRegex = new RegExp(`#[^${lineTerminatorJoined}]*`)
const ignored = [
  BOM,
  ...whitespace,
  ...lineTerminators,
  // insignificantComma,  // TODO: handle insignificantComma
]
const ignoredJoined = ignored.join('|')

const ignoredRegex = new RegExp(`[${ignoredJoined}]+`)
// console.log({ignoredRegex})

const isAnyToken = (char: string): boolean => {
  return true
}

const getNextTokenStart = (i: number, source: string): number | null => {
  const max = source.length
  while (i < max) {
    const char = source[i]
    const nextIsIgnored = ignored.includes(char)
    if (!nextIsIgnored) {
      return i
    }
    i++
  }
  return null
}

const isPunctuator = (char: string): boolean => {
  return punctuators.includes(char)
}

const isAfterEndOfToken = (token: string, char: string): boolean => {
  const tokenIsPunctuator = isPunctuator(token)
  if (tokenIsPunctuator) {
    return true
  }
  const nextIsPunctuator = isPunctuator(char)
  if (nextIsPunctuator) {
    return true
  }
  const nextIsIgnored = ignored.includes(char)
  if (nextIsIgnored) {
    return true
  }
  // This is ignored, but next isn't.
  const tokenIsIgnored = ignored.includes(token)
  if (tokenIsIgnored) {
    return true
  }

  return false
}


const getEndOfToken = (currentToken: string, i: number, gql: string): number => {
  const max = gql.length
  while (i < max) {
    const char = gql[i]
    const afterEnd = isAfterEndOfToken(currentToken, char)
    if (afterEnd) {
      break
    }
    i++
  }
  return i - 1
}

const findLexicalTokens = (gql: string): string[] => {

  const end = gql.length
  const tokens: string[] = []
  let tokenStart = getNextTokenStart(0, gql)
  if (tokenStart === null) {
    return []
  }
  let tokenEnd

  while (tokenStart < end) {
    tokenEnd = getEndOfToken(gql[tokenStart], tokenStart + 1, gql)
    const token = gql.substring(tokenStart, tokenEnd + 1)
    tokens.push(token)
    tokenStart = tokenEnd + 1
    tokenEnd = undefined
  }

  return tokens
}

const tokenizer = (gql: string): Token[] => {
  console.log(gql)
  const lexicalTokens = findLexicalTokens(gql)
  console.log({ lexicalTokens })
  return []
  // return gql.split('')
}

export default tokenizer

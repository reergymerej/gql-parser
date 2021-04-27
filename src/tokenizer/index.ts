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
const unicodeBOM = BOM

const whitespace = [
  '\u0009', // \t
  '\u0020', // space
]

const lineTerminators = [
  '\u000D\u000A',  // \r\n  Keep this first so \r doesn't prematurely match.
  '\u000A',  // \n
  '\u000D',  // \r
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




type GetToken = (input: string) => string | null

const getPunctuator: GetToken = input => {
  const char = input[0]
  if (punctuators.includes(char)) {
    return char
  }
  if (input.indexOf('...') === 0) {
    return '...'
  }
  return null
}

const getUnicodeBOM: GetToken = input => {
  const char = input[0]
  return char === unicodeBOM
  ? unicodeBOM
  : null
}

const getWhiteSpace: GetToken = input => {
  const char = input[0]
  return whitespace.includes(char)
    ? char
    : null
}

const getLineTerminator: GetToken = input => {
  return lineTerminators.find(x => input.indexOf(x) === 0)
    || null
}

const getComment: GetToken = input => {
  const matches = input.match(commentRegex)
  return matches && matches[0]
}

const getBlockString: GetToken = input => {
  // """ BlockStringCharacter """
  return ''
}

const getString: GetToken = input => {
  // " StringCharacter "
  const char = input[0]
  if (char === '"') {
    // SourceCharacter but not " or \ or LineTerminator
    const invalid = /^"[^"]*\\[^"]*"/
    const isInvald = invalid.test(input)
    if (isInvald) {
      throw new Error('This is an invalid string.')
    }

    const pattern = new RegExp(`^"[^"\\${lineTerminatorJoined}]*"`)
    const matches = input.match(pattern)
    return matches && matches[0]
  }
  return null
}

const getStringValue: GetToken = input => {
  return (input.indexOf('"""') === 0)
    ? getBlockString(input)
    : getString(input)
}

// This pulls the next token, assuming it starts at index[0].
export const getNextToken = (input: string): Token => {
  return getStringValue(input)
    || getComment(input)
    || getPunctuator(input)
    || getUnicodeBOM(input)
    || getWhiteSpace(input)
    || getLineTerminator(input)
}

const matchesPattern = (pattern: RegExp) =>
(string: string): boolean => pattern.test(string)

export const isSourceCharacter = matchesPattern(/[\u0009\u000A\u000D\u0020-\uFFFF]/)

export const isBlockStringCharacter = (value: string): boolean => {
  /*

    BlockStringCharacter ::
      SourceCharacter but not """ or \"""
      \"""

  */
  const tripleTerminal = '"""'
  const escapedTripleTerminal = '\\"""'
  return value === escapedTripleTerminal
    || (
      isSourceCharacter(value)
        && (
          value !== tripleTerminal
          && value !== escapedTripleTerminal
        )
    )
}

export const isEscapedCharacter = (value: string): boolean => {
  /*

    EscapedCharacter :: one of
      " \ / b f n r t

  */
 return [
   '"',
   '\\',
   '/',
   'b',
   'f',
   'n',
   'r',
   't',
 ].includes(value)
}

export const isEscapedUnicode = (value: string): boolean => {
  /*

    EscapedUnicode ::
      /[0-9A-Fa-f]{4}/

  */
 const terminal = /[0-9A-Fa-f]{4}/
 return terminal.test(value)
}

export const isStringCharacter = (value: string): boolean => {
  /*

    StringCharacter ::
      SourceCharacter but not " or | or LineTerminator
      \u EscapedUnicode
      \ EscapedCharacter

  */

 console.log({value})

 const isTerminal2 = (value: string) => {
   const slashU = '\\u'
   const startsWithSlashU = value.indexOf(slashU) === 0
   if (startsWithSlashU) {
     const rest = value.substr(slashU.length)
     return isEscapedUnicode(rest)
   }
   return false
 }

 return isTerminal2(value)


  return value[0] === '\\u' && isEscapedUnicode(value.substr(1))
  return false
}

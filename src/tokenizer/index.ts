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


// Step 1 - Find Lexical Tokens by splitting on Ignored Tokens.
const findLexicalTokens = (gql: string): [] => {
  // Before and after every lexical token may be any amount of ignored tokens
  // including WhiteSpace and Comment.
  // split on comments
  const withoutComments: string[] = gql.split(commentRegex)
  // console.log({ withoutComments })

  // Once comments are removed, we can split the remaining blocks by ignored
  // tokens.
  const withoutIgnored = withoutComments.reduce((acc, block) => {
    const blockWithoutIgnored = block.split(ignoredRegex)
      .filter(x => x)
    return [
      ...acc,
      ...blockWithoutIgnored,
    ]
  }, [] as string[])
  console.log({ withoutIgnored })

  return []
}

const tokenizer = (gql: string): Token[] => {
  console.log(gql)
  const lexicalTokens = findLexicalTokens(gql)
  console.log({ lexicalTokens })
  return []
  // return gql.split('')
}

export default tokenizer

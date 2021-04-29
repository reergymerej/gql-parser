export interface Token {
  type: string
  value: string
  ignored?: boolean
}

interface IgnoredToken extends Token {
  ignored: true
}

export type UnicodeBOM = IgnoredToken
export type WhiteSpace= IgnoredToken
export type LineTerminator= IgnoredToken
export type Comment= IgnoredToken
export type Comma= IgnoredToken

export type Ignored =
  | UnicodeBOM
  | WhiteSpace
  | LineTerminator
  | Comment
  | Comma

export type GetTokenResult = {
  token: Token | null,
  remainingInput: string,
}
export type GetToken = (input: string) => GetTokenResult

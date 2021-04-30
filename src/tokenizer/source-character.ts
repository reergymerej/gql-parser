
/*
SourceCharacter ::
  /[\u0009\u000A\u000D\u0020-\uFFFF]/
*/

export const isSourceChar = (input: string): boolean => {
  // eslint-disable-next-line no-control-regex
  return /[\u0009\u000A\u000D\u0020-\uFFFF]/.test(input)
}

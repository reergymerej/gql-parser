import { Evaluator} from './crawler'

/*
SourceCharacter ::
  /[\u0009\u000A\u000D\u0020-\uFFFF]/
*/

export type SourceCharacter = {
  type: 'SourceCharacter',
  value: string,
}

export const isSourceCharacter = (input: string): boolean => {
  // eslint-disable-next-line no-control-regex
  return /[\u0009\u000A\u000D\u0020-\uFFFF]/.test(input)
}

export const evaluate: Evaluator<SourceCharacter> = (reader) => {
  const value = reader.read(1)
  if (isSourceCharacter(value)) {
    const found: SourceCharacter = {
      type: 'SourceCharacter',
      value: value as SourceCharacter['value'],
    }
    return found
  }
  return null
}

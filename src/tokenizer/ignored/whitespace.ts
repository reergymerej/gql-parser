import {Evaluator} from '../crawler'

/*
WhiteSpace ::
  Horizontal Tab (U+0009)
  Space (U+0020)
*/

export type WhiteSpace = {
  type: 'WhiteSpace',
  value: '\u0009' | '\u0020',
}

export const isWhiteSpace = (char: string): boolean => {
  return [
  '\u0009',
  '\u0020',
  ].includes(char)
}

export const evaluate: Evaluator<WhiteSpace> = (reader) => {
  const value = reader.read(1)
  if (isWhiteSpace(value)) {
    const found: WhiteSpace = {
      type: 'WhiteSpace',
      value: value as WhiteSpace['value'],
    }
    return found
  }
  return null
}

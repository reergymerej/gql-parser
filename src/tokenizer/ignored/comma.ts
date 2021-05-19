import {Evaluator} from '../crawler'

/*
 Comma::
   ,
 */

export type Comma = {
  type: 'Comma',
  value: ',',
}

export const isComma = (char: string): boolean => {
  return char === ','
}

export const evaluate: Evaluator<Comma> = (reader) => {
  const value = reader.read(1)
  if (isComma(value)) {
    const found: Comma = {
      type: 'Comma',
      value: value as Comma['value'],
    }
    return found
  }
  return null
}

import {Evaluator} from '../crawler'
import {findWhileByCharacter} from '../util'

/*
NegativeSign ::
  -
*/

export type NegativeSign = {
  type: 'NegativeSign',
  value: '-',
}

export const isNegativeSign = (char: string): boolean => {
  return char === '-'
}

export const findWhileNegativeSign = findWhileByCharacter(isNegativeSign)

export const evaluate: Evaluator<NegativeSign> = (reader) => {
  const value = reader.read(1)
  if (isNegativeSign(value)) {
    const found: NegativeSign = {
      type: 'NegativeSign',
      value: value as NegativeSign['value'],
    }
    return found
  }
  return null
}

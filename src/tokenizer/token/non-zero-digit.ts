import {Count} from '../../types'
import {findWhileByCharacter} from '../util'
import {isDigit, evaluate as evaluateDigit} from './digit'
import { Evaluator} from '../crawler'

/*
NonZeroDigit ::
  Digit but not 0
*/

export type NonZeroDigit = {
  type: 'NonZeroDigit',
  value: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
}

export const isNonZeroDigit = (value: string): boolean => {
  const char = value[0]
  return char !== '0' && isDigit(char)
}

export const findWhileIsNonZeroDigit = findWhileByCharacter(isNonZeroDigit)
export const findWhileIsNonZeroDigitOne = findWhileByCharacter(isNonZeroDigit, Count.ONE)

export const evaluate: Evaluator<NonZeroDigit> = (reader) => {
  const digit = evaluateDigit(reader)
  if (digit && isNonZeroDigit(digit.value)) {
    const found: NonZeroDigit = {
      type: 'NonZeroDigit',
      value: digit.value as NonZeroDigit['value'],
    }
    return found
  }
  return null
}

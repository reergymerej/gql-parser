import {Evaluator} from '../../crawler'
import {findIndex} from '../../util'
import * as integerPart from '../integer-part'

/*
IntValue ::
  IntegerPart
*/

export type IntValue = {
  type: 'IntValue',
  value: string,
}

export const isIntValue = (value: string): boolean => {
  throw new Error('not implemented')
}

export const evaluate: Evaluator<IntValue> = (reader) => {
  const nonIntegerPartIndex = findIndex(reader, integerPart.isIntegerPart)
  if (nonIntegerPartIndex === -1) {
    return null
  }
  const full = reader.read(nonIntegerPartIndex)
  const found: IntValue = {
    type: 'IntValue',
    value: full as IntValue['value'],
  }
  return found
}

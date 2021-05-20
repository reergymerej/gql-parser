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
  const value = integerPart.evaluate(reader)
  if (value) {
    const found: IntValue = {
      type: 'IntValue',
      value: value.value as IntValue['value'],
    }
    return found
  }
  return null
}

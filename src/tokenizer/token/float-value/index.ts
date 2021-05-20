import {Evaluator} from '../../crawler'
import * as integerPart from '../integer-part'

/*
FloatValue ::
  IntegerPart FractionalPart
  IntegerPart ExponentPart
  IntegerPart FractionalPart ExponentPart
*/

export type FloatValue = {
  type: 'FloatValue',
  value: string,
}

export const isFloatValue = (value: string): boolean => {
  throw new Error('not implemented')
}

export const evaluate: Evaluator<FloatValue> = (reader) => {
  const head = integerPart.evaluate(reader)
  console.log(reader.all(), {head})
  throw new Error('FractionalPart not implemented')
}

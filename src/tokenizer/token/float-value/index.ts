import * as exponentPart from '../exponent-part'
import * as fractionalPart from '../fractional-part'
import * as integerPart from '../integer-part'
import {Evaluator, getReader} from '../../crawler'

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

const getType = (parts: string[]): FloatValue  => {
  return {
    type: 'FloatValue',
    value: parts.join('') as FloatValue['value'],
  }
}

const frac = (
  parts,
  theFractionalPart,
  tailReader,
) => {
  parts.push(theFractionalPart.value)
  const tailReader2 = getReader(tailReader.from(theFractionalPart.value.length))
  const theExponentPart = exponentPart.evaluate(tailReader2)
  if (theExponentPart) {
    parts.push(theExponentPart.value)
  }
  return getType(parts)
}

export const evaluate: Evaluator<FloatValue> = (reader) => {
  const parts: string[] = []
  const theIntegerPart = integerPart.evaluate(reader)
  if (theIntegerPart) {
    parts.push(theIntegerPart.value)
    const tailReader = getReader(reader.from(theIntegerPart.value.length))
    const theFractionalPart = fractionalPart.evaluate(tailReader)

    if (theFractionalPart) {
      return frac(
        parts,
        theFractionalPart,
        tailReader,
      )
    }

    const theExponentPart = exponentPart.evaluate(tailReader)
    if (theExponentPart) {
      parts.push(theExponentPart.value)
      return getType(parts)
    }
  }
  return null
}

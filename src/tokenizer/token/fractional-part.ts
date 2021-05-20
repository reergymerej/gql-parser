import { Evaluator} from '../crawler'
import * as digit from './digit'

/*
FractionalPart ::
  . Digit (list)
*/

export type FractionalPart = {
  type: 'FractionalPart',
  value: string,
}

export const isFractionalPart = (value: string): boolean => {
  throw new Error('not implemented')
}

export const evaluate: Evaluator<FractionalPart> = (reader) => {
  const head = reader.read(1)
  if (head === '.') {
    const tail = digit.getWhileIsDigit(reader.from(1))
    if (tail.length === 0) {
      return null
    }
    console.log({tail})
  }
  return null
  // if (isFractionalPart(value)) {
  //   const found: FractionalPart = {
  //     type: 'FractionalPart',
  //     value: value as FractionalPart['value'],
  //   }
  //   return found
  // }
}

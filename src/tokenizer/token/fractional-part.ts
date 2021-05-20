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

const getType = (head: string, tail: string): FractionalPart  => {
  const combined = `${head}${tail}`
  return {
    type: 'FractionalPart',
    value: combined as FractionalPart['value'],
  }
}

export const evaluate: Evaluator<FractionalPart> = (reader) => {
  const head = reader.read(1)
  if (head === '.') {
    const tail = digit.getWhileIsDigit(reader.from(1))
    if (tail.length === 0) {
      return null
    }
    return getType(head, tail)
  }
  return null
}

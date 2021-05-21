import { Evaluator} from '../crawler'

/*
ExponentPart ::
  ExponentIndicator Sign (opt) Digit (list)
*/

export type ExponentPart = {
  type: 'ExponentPart',
  value: string,
}

export const isExponentPart = (value: string): boolean => {
  throw new Error('not implemented')
}

const getType = (head: string, tail: string): ExponentPart  => {
  const combined = `${head}${tail}`
  return {
    type: 'ExponentPart',
    value: combined as ExponentPart['value'],
  }
}

export const evaluate: Evaluator<ExponentPart> = (reader) => {
  const value = reader.read(1)
  if (isExponentPart(value)) {
    return getType(value, '')
  }
  return null
}

import { Evaluator} from '../crawler'

/*
ExponentIndicator ::
  e E
*/

export type ExponentIndicator = {
  type: 'ExponentIndicator',
  value: string,
}

export const isExponentIndicator = (value: string): boolean => {
  return [
    'e',
    'E',
  ].includes(value[0])
}

const getType = (head: string, tail: string): ExponentIndicator  => {
  const combined = `${head}${tail}`
  return {
    type: 'ExponentIndicator',
    value: combined as ExponentIndicator['value'],
  }
}

export const evaluate: Evaluator<ExponentIndicator> = (reader) => {
  const value = reader.read(1)
  if (isExponentIndicator(value)) {
    return getType(value, '')
  }
  return null
}

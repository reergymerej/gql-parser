import { Evaluator} from '../crawler'

/*
StringValue ::
  " StringCharacter (list, opt) "
  """ BlockStringCharacter (list, opt) """
*/

export type StringValue = {
  type: 'StringValue',
  value: string,
}

export const isStringValue = (value: string): boolean => {
  throw new Error('not implemented')
}

const getType = (head: string, tail: string): StringValue  => {
  const combined = `${head}${tail}`
  return {
    type: 'StringValue',
    value: combined as StringValue['value'],
  }
}

export const evaluate: Evaluator<StringValue> = (reader) => {
  const value = reader.read(1)
  if (isStringValue(value)) {
    return getType(value, '')
  }
  return null
}

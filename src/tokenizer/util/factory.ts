import {Evaluator} from '../crawler'

interface GenericType {
  type: string
  value: string
}

const getGetType = <T extends GenericType>(typeName: string) =>
  (head: string, tail: string): T => {
    const combined = `${head}${tail}`
    return {
      type: typeName,
      value: combined as T['value'],
    } as T
  }

type SingleCharChecker = (value: string) => boolean
export const isInValues = (values: string[]): SingleCharChecker => (value: string): boolean => {
  return values.includes(value[0])
}

export const getEvaluator = <T extends GenericType>(
  singleCharChecker: SingleCharChecker,
  typeName: string,
): Evaluator<T> => {
  const getType = getGetType<T>(typeName)
  const evaluate: Evaluator<T> = (reader) => {
    const value = reader.read(1)
    return singleCharChecker(value)
      ? getType(value, '')
      : null
  }
  return evaluate
}

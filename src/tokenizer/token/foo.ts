import { Evaluator} from '../crawler'

/*
Foo ::
*/

export type Foo = {
  type: 'Foo',
  value: string,
}

export const isFoo = (value: string): boolean => {
  throw new Error('not implemented')
}

const getType = (head: string, tail: string): Foo  => {
  const combined = `${head}${tail}`
  return {
    type: 'Foo',
    value: combined as Foo['value'],
  }
}

export const evaluate: Evaluator<Foo> = (reader) => {
  const value = reader.read(1)
  if (isFoo(value)) {
    return getType(value, '')
  }
  return null
}

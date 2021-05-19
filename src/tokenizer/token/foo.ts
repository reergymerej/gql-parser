import { Evaluator} from '../crawler'

/*
Foo ::
*/

export type Foo = {
  type: 'Foo',
  value: string,
}

export const isFoo = (char: string): boolean => {
  return char === '?'
}

export const evaluate: Evaluator<Foo> = (reader) => {
  const value = reader.read(1)
  if (isFoo(value)) {
    const found: Foo = {
      type: 'Foo',
      value: value as Foo['value'],
    }
    // DO NOT CONSUME HERE!  That is up to the caller.
    return found
  }
  return null
}

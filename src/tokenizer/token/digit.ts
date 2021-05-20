import { Evaluator, getReader} from '../crawler'
import {StringPredicate} from '../types'
import {findIndex, findWhileByCharacter, ReaderOrString} from '../util'

/*
Digit :: one of
  0 1 2 3 4 5 6 7 8 9
*/

export type Digit = {
  type: 'Digit',
  value: '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
}

export const isDigit = (char: string): boolean => {
  return [
    '0' ,
    '1' ,
    '2' ,
    '3' ,
    '4' ,
    '5' ,
    '6' ,
    '7' ,
    '8' ,
    '9',
  ].includes(char)
}

export const startsWithDigits: StringPredicate = (value) => {
  const reader = getReader(value)
  const firstNonDigit = findIndex(reader, isDigit)
  return firstNonDigit > -1
}

// TODO: Is this used?
export const findWhileIsDigit = findWhileByCharacter(isDigit)

export const getWhileIsDigit = (input: ReaderOrString): string => {
  const reader = typeof input === 'string'
    ? getReader(input)
    : input
  const lastDigitIndex = findIndex(
    reader,
    (value: string) => isDigit(value[0])
  )
  if (lastDigitIndex === -1) {
    return ''
  }
  return reader.read(lastDigitIndex)
}

export const evaluate: Evaluator<Digit> = (reader) => {
  const value = reader.read(1)
  if (isDigit(value)) {
    const found: Digit = {
      type: 'Digit',
      value: value as Digit['value'],
    }
    return found
  }
  return null
}

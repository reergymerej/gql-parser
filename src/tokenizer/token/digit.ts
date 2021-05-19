import {findWhileByCharacter} from '../util'
import { Evaluator} from '../crawler'

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

export const findWhileIsDigit = findWhileByCharacter(isDigit)

export const evaluate: Evaluator<Digit> = (reader) => {
  const value = reader.read(1)
  if (isDigit(value)) {
    const found: Digit = {
      type: 'Digit',
      value: value as Digit['value'],
    }
    reader.consume(value.length)
    return found
  }
  return null
}

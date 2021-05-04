import {findWhile} from '../util'

/*
Digit :: one of
  0 1 2 3 4 5 6 7 8 9
*/

export const isDigit = (char: string): boolean => {
  return [ '0' ,
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

export const findWhileIsDigit = findWhile(isDigit)

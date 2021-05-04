import {findWhile} from "../util"

/*
NegativeSign ::
-
*/
export const isNegativeSign = (char: string): boolean => {
  return char === '-'
}

export const findWhileNegativeSign = findWhile(isNegativeSign)

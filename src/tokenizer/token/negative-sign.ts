import {findWhileByCharacter} from "../util"

/*
NegativeSign ::
-
*/
export const isNegativeSign = (char: string): boolean => {
  return char === '-'
}

export const findWhileNegativeSign = findWhileByCharacter(isNegativeSign)

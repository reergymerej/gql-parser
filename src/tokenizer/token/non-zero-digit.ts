import {Count} from "../../types"
import {findWhileByCharacter} from "../util"
import {isDigit} from "./digit"

/*
NonZeroDigit ::
  Digit but not 0
*/
export const isNonZeroDigit = (char: string): boolean => {
  return char !== '0' && isDigit(char)
}

export const findWhileIsNonZeroDigit = findWhileByCharacter(isNonZeroDigit)
export const findWhileIsNonZeroDigitOne = findWhileByCharacter(isNonZeroDigit, Count.ONE)

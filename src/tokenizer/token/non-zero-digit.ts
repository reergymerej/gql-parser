import {isDigit} from "./digit"

/*
NonZeroDigit ::
  Digit but not 0
*/
export const isNonZeroDigit = (char: string): boolean => {
  return char !== '0' && isDigit(char)
}



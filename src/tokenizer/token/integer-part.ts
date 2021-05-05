import {Count} from '../../types'
import {GetToken, GetTokenResult} from '../types'
import {assembler, findWhileByCharacter} from '../util'
import {findWhileIsDigit, isDigit} from './digit'
import {findWhileNegativeSign} from './negative-sign'
import {findWhileIsNonZeroDigit, findWhileIsNonZeroDigitOne} from './non-zero-digit'

/*
IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

const getNegativeSign = (input: string): string => {
  return findWhileNegativeSign(input).result
}

const findWhileIsZero = findWhileByCharacter(x => x === '0')

// NegativeSign (opt) 0
const one = (input: string): GetTokenResult => {
  const assembled = assembler([
    {
      count: Count.ONE_OR_FEWER,
      finder: findWhileNegativeSign,
    },
    {
      count: Count.ONE,
      finder: findWhileIsZero,
    },
  ], input, 'IntegerPart')
  return assembled
}

// NegativeSign (opt) NonZeroDigit Digit (list, opt)
const two = (input: string): GetTokenResult => {
  const assembled = assembler([
    {
      count: Count.ONE_OR_FEWER,
      finder: findWhileNegativeSign,
    },
    {
      count: Count.ONE,
      finder: findWhileIsNonZeroDigitOne,
    },
    {
      count: Count.ANY,
      finder: findWhileIsDigit,
    },
  ], input, 'IntegerPart')
  return assembled
}

export const getIntegerPart: GetToken = (input) => {
  const variations = [
    two,
    one,
  ]
  let result: GetTokenResult = {
    token: null,
    remainingInput: input,
  }
  for (let i = 0; i < variations.length && !result?.token; i++) {
    const variation = variations[i]
    const t = variation(input)
    result = t
  }
  return result
}

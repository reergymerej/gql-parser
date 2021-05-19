import {Count} from '../../types'
import {GetToken, GetTokenResult} from '../types'
import {assembler, findWhile, findWhileByCharacter} from '../util'
import {crawler, EvaluationResult, Evaluator} from '../crawler'
import {findWhileIsDigit, isDigit} from './digit'
import {findWhileIsNonZeroDigit, findWhileIsNonZeroDigitOne} from './non-zero-digit'
import {findWhileNegativeSign} from './negative-sign'

/*
IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

export type IntegerPart = {
  type: 'IntegerPart',
  value: string
}


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

// TODO: implement
const isIntegerPart = () => true
export const findWhileIsIntegerPart = findWhile(isIntegerPart)

const isOne = (input: string): boolean => {
  return input === '\u000A'
}

export const oneNew: Evaluator<IntegerPart> = (reader) => {
  const read = reader.read(1)
  const isFound = isOne(read)
  if (isFound) {
    const value = read as IntegerPart['value']
    const found: IntegerPart = {
      type: 'IntegerPart',
      value,
    }
    return found
  }
  return null
}

const isTwo = (input: string): boolean => {
  return input[0] === '\u000D'
    && input[1] !== '\u000A'
}

export const twoNew: Evaluator<IntegerPart> = (reader) => {
  const read = reader.read(2)
  const isFound = isTwo(read)
  if (isFound) {
    const value = read[0] as IntegerPart['value']
    const found: IntegerPart = {
      type: 'IntegerPart',
      value,
    }
    return found
  }
  return null
}

export const evaluate: Evaluator<IntegerPart> = (reader) => {
  const checks: Evaluator<IntegerPart>[] = [
    twoNew,
    oneNew,
  ]
  let found: EvaluationResult<IntegerPart> = null
  for (const check of checks) {
    found = check(reader)
    if (found) {
      reader.consume(found.value.length)
      break
    }
  }
  return found
}

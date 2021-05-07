import {Count} from '../../types'

export type FindWhileResult = {
  result: string,
  index: number, // This is the index AFTER the result.
  instanceCount: number,
}
export type Predicate = (input: string, max?: Count) => boolean
export type FindWhileInput = (input: string) => FindWhileResult

type FindWhile = (predicate: Predicate, max?: Count) => FindWhileInput
export type GetWhilePredicate = (input: string, max?: Count) => FindWhileResult
export type GetWhileResult = {
  instanceCount: number,
  remainingInput: string,
  value: string,
}

export const findWhileByCharacter: FindWhile = (predicate, max) => input => {
  let i = 0
  let instanceCount = 0
  let hitCap = false
  for (; i < input.length && !hitCap;) {
    // This is only looking one character at a time.
    // There is no reason the predicate can't handle more than one char.
    const char = input[i]
    // const tail = input.substring(i)
    const isCorrectType = predicate(char, max)
    if (!isCorrectType) {
      break
    }
    // TODO: increment tail by length of this instance
    const instance = char
    const instanceLength = instance.length
    i += instanceLength
    instanceCount++
    if (max !== undefined) {
      switch (max) {
        case Count.ONE:
        case Count.ONE_OR_FEWER:
          hitCap = true
          break
        case Count.ONE_OR_MORE:
        case Count.ANY:
          hitCap = false
          break
        default:
          throw new Error(`unhandled case "${Count[max]}"`)
      }
    }

  }
  const result = input.substring(0, i)
  return {
    index: i,
    instanceCount,
    result,
  }
}

// TODO: make one that is not by-character
export const findWhile = findWhileByCharacter

// TODO: getWhile vs findWhile - Make clear the distinction.
export const getWhile = (input: string, getWhilePredicate: GetWhilePredicate, max?: Count): GetWhileResult => {
  const result = getWhilePredicate(input, max)
  if (result.result.length) {
    const remainingInput = input.substring(result.index)
    return {
      instanceCount: result.instanceCount,
      remainingInput,
      value: result.result,
    }
  }
  return {
    instanceCount: 0,
    remainingInput: input,
    value: '',
  }
}

import {Count} from '../../types'

export type FindWhileResult = {
  result: string,
  index: number, // This is the index AFTER the result.
  instanceCount: number,
}
export type Predicate = (input: string, max?: Count) => boolean
export type FindWhileInput = (input: string) => FindWhileResult

type FindWhile = (predicate: Predicate, max?: Count) => FindWhileInput
export type GetWhilePicker = (input: string, max?: Count) => FindWhileResult
export type GetWhilePredicate = GetWhilePicker
export type GetWhileResult = {
  instanceCount: number,
  remainingInput: string,
  value: string,
}

export const isUnderLimit = (limit: Count, count: number): boolean => {
  switch (limit) {
    case Count.ONE:
    case Count.ONE_OR_FEWER:
      return count <= 1
    case Count.ONE_OR_MORE:
      return count >= 1
    case Count.ANY:
      return true
  }
}

export const findWhileByCharacter: FindWhile = (predicate, max) => input => {
  let i = 0
  let instanceCount = 0
  const limitReached = () => {
    if (max !== undefined) {
      return !isUnderLimit(max, instanceCount)
    }
    return false
  }
  let result = ''
  for (; i < input.length && !limitReached();) {
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
    result += char
  }
  return {
    index: i,
    instanceCount,
    result,
  }
}

// TODO: make one that is not by-character
export const findWhile = findWhileByCharacter

// TODO: getWhile vs findWhile - Make clear the distinction.
export const getWhile = (input: string, getWhilePicker: GetWhilePicker, max?: Count): GetWhileResult => {
  const findWhileResult = getWhilePicker(input, max)
  if (findWhileResult.result.length) {
    const remainingInput = input.substring(findWhileResult.index)
    return {
      instanceCount: findWhileResult.instanceCount,
      remainingInput,
      value: findWhileResult.result,
    }
  }
  return {
    instanceCount: 0,
    remainingInput: input,
    value: '',
  }
}

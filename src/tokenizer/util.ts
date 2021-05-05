import {GetToken, GetTokenResult, Token} from './types'

export const getFirstTokenMatch = (getTokenTests: GetToken[]) => (input: string): GetTokenResult | null => {
  let positiveTokenResult: GetTokenResult | null = null
  for (let i = 0; !positiveTokenResult && i < getTokenTests.length; i++) {
    const getTokenTest = getTokenTests[i]
    // console.log(getTokenTest)
    const result = getTokenTest(input)
    if (result.token !== null) {
      positiveTokenResult = result
    }
  }
  if (!positiveTokenResult) {
    // console.log(`No token found in "${input}"`)
  }
  return positiveTokenResult
}

export type Predicate = (input: string) => boolean

type FindWhileResult = {
  result: string,
  index: number,
  instanceCount: number,
}

export type FindWhileInput = (input: string) => FindWhileResult
type FindWhile = (predicate: Predicate) => FindWhileInput
export const findWhileByCharacter: FindWhile = predicate => input => {
  let i = 0
  let instanceCount = 0
  for (; i < input.length;) {
    // This is only looking one character at a time.
    // There is no reason the predicate can't handle more than one char.
    const char = input[i]
    // const tail = input.substring(i)
    const isCorrectType = predicate(char)
    if (!isCorrectType) {
      break
    }
    // TODO: increment tail by length of this instance
    const instance = char
    const instanceLength = instance.length
    i += instanceLength
    instanceCount++
  }
  const result = input.substring(0, i)
  return {
    index: i,
    instanceCount,
    result,
  }
}

type GetWhilePredicate = (input: string) => FindWhileResult
type GetWhileResult = {
  instanceCount: number,
  remainingInput: string,
  value: string,
}
export const getWhile = (input: string, predicate: GetWhilePredicate): GetWhileResult => {
  const result = predicate(input)
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

export const isToken = (getToken: GetToken) => (input: string): boolean => {
  let isThisTypeOfToken = false
  try {
    isThisTypeOfToken = getToken(input).token !== null
  } catch {}
  return isThisTypeOfToken
}

interface WithToken {
  token: Token,
}
type ChangeType = (result: GetTokenResult & WithToken, type: string) => GetTokenResult
export const changeType: ChangeType = (getTokenResult, type) => {
  return {
    ...getTokenResult,
    token: {
      ...getTokenResult.token,
      type,
    },
  }
}

export enum Count {
  ONE,
  ONE_OR_FEWER,
  ONE_OR_MORE,
  ANY,
}

export type Requirement = {
  finder: FindWhileInput
  count: Count
}

const requirementMet = (count: Count, instanceCount: number): boolean => {
  switch (count) {
    case Count.ONE:
      return instanceCount === 1
    case Count.ONE_OR_FEWER:
      return instanceCount <= 1
    case Count.ONE_OR_MORE:
      return instanceCount >= 1
    case Count.ANY:
      return true
    default:
      throw new Error(`unhandled case "${Count[count]}"`)
  }
}

export const assembler = (requirements: Requirement[], input: string, type: string): GetTokenResult => {
  let allRequirementsMet = true
  let remainingInput = input
  let value = ''
  for (let i = 0; i < requirements.length && allRequirementsMet; i++) {
    const requirement = requirements[i]
    const getWhileResult = getWhile(remainingInput, requirement.finder)
    if (requirementMet(
        requirement.count,
        getWhileResult.instanceCount,
      )) {
      value += getWhileResult.value
      remainingInput = getWhileResult.remainingInput
    } else {
      allRequirementsMet = false
      break
    }
  }

  if (allRequirementsMet) {
    return {
      remainingInput,
      token: {
        type,
        value,
      },
    }
  }
  return {
    remainingInput: input,
    token: null,
  }
}

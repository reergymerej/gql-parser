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
  result: string
  index: number
}

export type FindWhileInput = (input: string) => FindWhileResult
type FindWhile = (predicate: Predicate) => FindWhileInput
export const findWhile: FindWhile = predicate => input => {
  let i = 0
  for (; i < input.length; i++) {
    // This is only looking one character at a time.
    // There is no reason the predicate can't handle more than one char.
    const char = input[i]
    const isCorrectType = predicate(char)
    if (!isCorrectType) {
      break
    }
  }
  const result = input.substring(0, i)
  return {
    index: i,
    result,
  }
}

type GetWhilePredicate = (input: string) => FindWhileResult
export const getWhile = (input: string, predicate: GetWhilePredicate): {
  remainingInput: string,
  value: string,
} => {
  const digitsResult = predicate(input)
  if (digitsResult.result.length) {
    const remainingInput = input.substring(digitsResult.index)
    return {
      value: digitsResult.result,
      remainingInput,
    }
  }
  return {
    value: '',
    remainingInput: input,
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

const requirementMet = (count: Count, value: string): boolean => {
  // XXX
  // This assumes each token has a length of one.  That is not right.  One
  // "FloatValue" will be multiple characters.
  switch (count) {
    case Count.ONE:
      return value.length === 1

    case Count.ONE_OR_FEWER:
      return value.length <= 1

    case Count.ONE_OR_MORE:
      return value.length >= 1

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
    if (requirementMet(requirement.count, getWhileResult.value)) {
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

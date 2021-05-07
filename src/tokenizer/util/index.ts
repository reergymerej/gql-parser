import {Count} from '../../types'
import {GetToken, GetTokenResult, Token} from '../types'
import {FindWhileInput, getWhile} from './finder'

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
    const getWhileResult = getWhile(
      remainingInput,
      requirement.finder,
      requirement.count,
    )
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

export {
  findWhile,
  findWhileByCharacter,
  getWhile,
} from './finder'

import {GetToken, GetTokenResult} from './types'

export const getFirstTokenMatch = (getTokenTests: GetToken[]) => (input: string): GetTokenResult => {
  let positiveTokenResult: GetTokenResult | null = null
  for (let i = 0; !positiveTokenResult && i < getTokenTests.length; i++) {
    const getTokenTest = getTokenTests[i]
    const result = getTokenTest(input)
    if (result.token !== null) {
      positiveTokenResult = result
    }
  }
  if (!positiveTokenResult) {
    throw new Error(`No token found in "${input}"`)
  }
  return positiveTokenResult
}

export type Predicate = (input: string) => boolean

type FindWhileResult = {
  result: string
  index: number
}
export const findWhile = (predicate: Predicate) => (input: string): FindWhileResult => {
  let i = 0
  for (; i < input.length; i++) {
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

export const isToken = (getToken: GetToken) => (input: string): boolean => {
  let isThisTypeOfToken = false
  try {
    isThisTypeOfToken = getToken(input).token !== null
  } catch {}
  return isThisTypeOfToken
}


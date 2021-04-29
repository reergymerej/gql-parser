import {GetToken, GetTokenResult} from "./types"

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

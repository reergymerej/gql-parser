import floatValue from './stub'
import intValue from './stub'
import name from './stub'
import punctuator from './punctuator'
import stringValue from './stub'
import {GetToken, GetTokenResult} from '../types'
import {getFirstTokenMatch} from '../util'

/*
https://spec.graphql.org/June2018/#sec-Appendix-Grammar-Summary.Lexical-Tokens
Token ::
  Punctuator
  Name
  IntValue
  FloatValue
  StringValue
*/

export const getToken: GetToken = (input) => {
  const getTokenResult: GetTokenResult | null =
    getFirstTokenMatch([
      punctuator,
      name,
      intValue,
      floatValue,
      stringValue,
    ])(input)
  if (getTokenResult) {
    return getTokenResult
  }
  return {
    token: null,
    remainingInput: input
  }
}

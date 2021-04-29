import * as ignored from './ignored'
import * as punctuator from './punctuator'
import {GetToken} from './types'
import {getFirstTokenMatch} from './util'

/*
Token ::
  Punctuator
  Name
  IntValue
  FloatValue
  StringValue
*/

export const getToken: GetToken = (input) => {
  const matchers = getFirstTokenMatch([
    ignored.getToken,
    punctuator.getToken,
  ])
  const result = matchers(input)
  return result
}

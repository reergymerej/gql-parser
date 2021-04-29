import {GetToken} from './types'
import * as punctuator from './punctuator'
import * as ignored from './ignored'

/*
Token ::
  Punctuator
  Name
  IntValue
  FloatValue
  StringValue
*/

export const getToken: GetToken = (input) => {
  return ignored.getToken(input)
    || punctuator.getToken(input)
}

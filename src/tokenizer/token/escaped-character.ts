import {isInValues, getEvaluator} from '../util/factory'

/*
EscapedCharacter ::
  " \ / b f n r t
*/

export type EscapedCharacter = {
  type: 'EscapedCharacter',
  value: string,
}

export const checkSingleChar = isInValues(
  '"\\/bfnrt'.split('')
)

export const evaluate = getEvaluator<EscapedCharacter>(checkSingleChar, 'EscapedCharacter')

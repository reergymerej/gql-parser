import {isInValues, getEvaluator} from '../util/factory'

/*
Sign :: one of
  + -
*/

export type Sign = {
  type: 'Sign',
  value: string,
}

export const checkSingleChar = isInValues([
  '-',
  '+',
])

export const evaluate = getEvaluator<Sign>(checkSingleChar, 'Sign')

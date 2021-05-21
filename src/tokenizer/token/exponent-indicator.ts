import {isInValues, getEvaluator} from '../util/factory'
/*
ExponentIndicator ::
  e E
*/

export type ExponentIndicator = {
  type: 'ExponentIndicator',
  value: string,
}

export const checkSingleChar = isInValues([
  'e',
  'E',
])

export const evaluate = getEvaluator<ExponentIndicator>(checkSingleChar, 'ExponentIndicator')

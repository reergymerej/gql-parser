import {Count} from '../../types'
import {GetToken} from '../types'
import {assembler, findWhileByCharacter, Requirement} from '../util'

/*
ExponentIndicator ::
  e E
*/

const isExponentIndicator = (char: string): boolean => {
  return [
    'e',
    'E',
  ].includes(char)
}

export const findWhileIsExponentIndicator = findWhileByCharacter(isExponentIndicator)

const getToken: GetToken = function ExponentIndicator(input) {
  const requirements: Requirement[] = [
    {
      count: Count.ONE,
      finder: findWhileIsExponentIndicator,
    },
  ]
  return assembler(requirements, input, 'ExponentIndicator')
}

export default getToken

import {Predicate, findWhileByCharacter, FindWhileResult} from './finder'

describe('findWhileByCharacter', () => {
  describe('when the predicate finds nothing', () => {
    it('should return an empty result', () => {
      const predicate: Predicate = () => false
      const input = 'xxx'
      const actual = findWhileByCharacter(predicate)(input)
      const expected: FindWhileResult = {
        index: 0,
        instanceCount: 0,
        result: '',
      }
      expect(actual).toEqual(expected)
    })
  })
})

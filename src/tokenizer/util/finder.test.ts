import {Count} from '../../types'
import {
  FindWhileResult,
  GetWhilePredicate,
  GetWhileResult,
  Predicate,
  findWhileByCharacter,
  getWhile,
} from './finder'

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

describe('getWhile', () => {
  describe('when the predicate finds nothing', () => {
    it('should return an empty result', () => {
      const getWhilePredicate: GetWhilePredicate = () => ({
        result: '',
        instanceCount: 0,
        index: 0,
      })
      const input = 'xxx'
      const max: Count = Count.ANY
      const actual = getWhile(input, getWhilePredicate, max)
      const expected: GetWhileResult = {
        instanceCount: 0,
        value: '',
        remainingInput: 'xxx',
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('when the predicate finds something', () => {
    it('should return info about the match and where to resume', () => {
      const getWhilePredicate: GetWhilePredicate = () => ({
        result: 'xxx',
        instanceCount: 1,
        index: 3,
      })
      const input = 'xxxyyy'
      const max: Count = Count.ANY
      const actual = getWhile(input, getWhilePredicate, max)
      const expected: GetWhileResult = {
        instanceCount: 1,
        value: 'xxx',
        remainingInput: 'yyy',
      }
      expect(actual).toEqual(expected)
    })
  })
})

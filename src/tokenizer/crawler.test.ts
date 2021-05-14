import {crawler, CrawlerResult, Evaluator} from './crawler'

type FoundType = {
  type: string
  value: string
}

describe('crawler', () => {
  describe('when nothing is found', () => {
    const evaluate: Evaluator<FoundType> = () => null

    it('should null and the whole input', () => {
      const input = 'foobar'
      const actual = crawler(input, evaluate)
      const remaining = input
      const expected: CrawlerResult<FoundType> = [null, remaining]
      expect(actual).toEqual(expected)
    })
  })

  describe('when something is found', () => {
    const evaluate: Evaluator<FoundType> = (reader) => {
      const read = reader.read(3)
      const isFound = read === 'foo'
      if (isFound) {
        reader.consume(3)
      }
      const A_FOO_IDENTIFIER: FoundType = { type: 'A_FOO', value: read }
      return isFound
        ? A_FOO_IDENTIFIER
        : null
    }

    it('should something and the remaining input', () => {
      const input = 'foobarbazquux'
      const actual = crawler(input, evaluate)
      const remaining = 'barbazquux'
      const expected: CrawlerResult<FoundType> = [{ type: 'A_FOO', value: 'foo' }, remaining]
      expect(actual).toEqual(expected)
    })
  })
})

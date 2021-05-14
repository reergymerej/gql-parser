import {crawler, CrawlerResult, Evaluator, FoundType} from './crawler'


describe('crawler', () => {
  describe('when nothing is found', () => {
    const evaluate: Evaluator = () => null

    it('should null and the whole input', () => {
      const input = 'foobar'
      const actual = crawler(input, evaluate)
      const remaining = input
      const expected: CrawlerResult = [null, remaining]
      expect(actual).toEqual(expected)
    })
  })

  describe('when something is found', () => {
    const A_FOO_IDENTIFIER: FoundType = { type: 'A_FOO', value: 'foo' }
    const evaluate: Evaluator = (reader) => {
      const isFound = reader.read(3) === 'foo'
      if (isFound) {
        reader.consume(3)
      }
      return isFound
        ? A_FOO_IDENTIFIER
        : null
    }

    it('should something and the remaining input', () => {
      const input = 'foobarbazquux'
      const actual = crawler(input, evaluate)
      const remaining = 'barbazquux'
      const expected: CrawlerResult = [A_FOO_IDENTIFIER, remaining]
      expect(actual).toEqual(expected)
    })
  })
})

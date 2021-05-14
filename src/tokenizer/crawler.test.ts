import {crawler, CrawlerResult, Evaluator, FoundType} from './crawler'


describe('crawler', () => {
  describe('when nothing is found', () => {
    const evaluate: Evaluator = () => {
      return 'not sure'
    }

    it('should null and the whole input', () => {
      const input = 'foobar'
      const actual = crawler(input, evaluate)
      const remaining = input
      const expected: CrawlerResult = [null, remaining]
      expect(actual).toEqual(expected)
    })
  })

  describe('when nothing is found #2', () => {
    const evaluate: Evaluator = () => {
      return false
    }

    it('should null and the whole input', () => {
      const input = 'foobar'
      const actual = crawler(input, evaluate)
      const remaining = input
      const expected: CrawlerResult = [null, remaining]
      expect(actual).toEqual(expected)
    })
  })

  describe('when something is found', () => {
    const evaluate: Evaluator = input => {
      return input.length < 3
        ? 'not sure'
        : input === 'foo'
    }

    it('should something and the remaining input', () => {
      const input = 'foobar'
      const actual = crawler(input, evaluate)
      const A_FOO_IDENTIFIER: FoundType = { type: 'A_FOO', value: 'foo' }
      const remaining = 'bar'
      const expected: CrawlerResult = [A_FOO_IDENTIFIER, remaining]
      expect(actual).toEqual(expected)
    })
  })
})

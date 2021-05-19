import {crawler, CrawlerResult} from '../crawler'
import { evaluate, Comment } from './comment'

describe('Comment', () => {
  describe('Evaluator', () => {
    it.each<[string, null | string]>([
      [
        '',
        null,
      ],
      [
        '# ',
        '# ',
      ],
      [
        '#',
        '#',
      ],
      [
        '# Look at this!\nnot this',
        '# Look at this!',
      ],
      [
        '# Look at this!',
        '# Look at this!',
      ],
      [
        '# Look at this!\u000Anot this',
        '# Look at this!',
      ],
    ])('should find %s', (input, expectedValue) => {
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Comment',
          value: expectedValue as Comment['value'],
        } as Comment
      const expected: CrawlerResult<Comment> = [
        expectedResultValue,
        expect.any(String),
      ]
      expect(actual).toEqual(expected)
    })
  })
})

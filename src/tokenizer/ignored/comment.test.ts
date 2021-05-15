import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import comment, { evaluate, Comment } from './comment'

describe('Comment', () => {
  describe('negative test', () => {
    it('should NOT return the Comment', () => {
      const input = 'This is not a comment.'
      const actual = comment(input)
      const expected: GetTokenResult = {
        token: null,
        remainingInput: input,
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('with empty CommentChar', () => {
    it('should return the Comment', () => {
      const input = '#'
      const actual = comment(input)
      const expected: GetTokenResult = {
        token: {
          type: 'Comment',
          ignored: true,
          value: '#',
        },
        remainingInput: '',
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('with CommentChar', () => {
    it('should return the Comment', () => {
      const input = '#I\'m a little teapot.\u000AHere\'s my spout.'
      const actual = comment(input)
      const expected: GetTokenResult = {
        token: {
          type: 'Comment',
          ignored: true,
          value: '#I\'m a little teapot.',
        },
        remainingInput: '\u000AHere\'s my spout.',
      }
      expect(actual).toEqual(expected)
    })
  })

  fdescribe('Evaluator', () => {
    it.each<[string, null | string]>([
      // [
      //   '',
      //   null,
      // ],
      // [
      //   '#',
      //   '#',
      // ],
      // [
      //   '# Look at this!',
      //   '# Look at this!',
      // ],
      [
        '# Look at this!\nnotthis',
        '# Look at this!',
      ],
    ])('should find %s', (prefix, expectedValue) => {
      const remainingInput = '\u0019<- That is NOT a source char!'
      const input = `${prefix === null ? '' : prefix}${remainingInput}`
      const actual = crawler(input, evaluate)
      const expectedResultValue = (expectedValue === null)
        ? null
        : {
          type: 'Comment',
          value: expectedValue as Comment['value'],
        } as Comment
      const expected: CrawlerResult<Comment> = [
        expectedResultValue,
        remainingInput,
      ]
      expect(actual).toEqual(expected)
    })
  })
})

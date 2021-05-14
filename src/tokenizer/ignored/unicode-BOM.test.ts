import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import unicodeBOM, {evaluate, UnicodeBOM} from './unicode-BOM'

describe('UnicodeBOM', () => {
  it('should NOT return the UnicodeBOM', () => {
    const remainingInput = '#and the rest'
    const input = `${remainingInput}`
    const actual = unicodeBOM(input)
    const expected: GetTokenResult = {
      token: null,
      remainingInput: input,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the UnicodeBOM', () => {
    const remainingInput = '#and the rest'
    const input = `\uFEFF${remainingInput}`
    const actual = unicodeBOM(input)
    const expected: GetTokenResult = {
      token: {
        ignored: true,
        type: 'UnicodeBOM',
        value: '\uFEFF',
      },
      remainingInput,
    }
    expect(actual).toEqual(expected)
  })

  describe('Evaluator', () => {
    it.each([
      null,
      '\uFEFF',
    ])('should find %s', (prefix) => {
      const remainingInput = '#and the rest'
      const input = `${prefix === null ? '' : prefix}${remainingInput}`
      const actual = crawler(input, evaluate)
      const expectedValue = (prefix === null)
        ? null
        : {
          type: 'UnicodeBOM',
          value: prefix as UnicodeBOM['value'],
        } as UnicodeBOM
        const expected: CrawlerResult<UnicodeBOM> = [
          expectedValue,
          remainingInput,
        ]
        expect(actual).toEqual(expected)
    })
  })
})
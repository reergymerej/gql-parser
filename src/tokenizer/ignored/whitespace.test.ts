import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import getToken, {evaluate, WhiteSpace} from './whitespace'

describe('WhiteSpace', () => {
  it('should NOT return the WhiteSpace', () => {
    const remainingInput = '#and the rest'
    const input = `${remainingInput}`
    const actual = getToken(input)
    const expected: GetTokenResult = {
      token: null,
      remainingInput: input,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the WhiteSpace', () => {
    const remainingInput = '#and the rest'
    const input = `\u0009${remainingInput}`
    const actual = getToken(input)
    const expected: GetTokenResult = {
      token: {
        ignored: true,
        type: 'WhiteSpace',
        value: '\u0009',
      },
      remainingInput,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the WhiteSpace #2', () => {
    const remainingInput = '#and the rest'
    const input = `\u0020${remainingInput}`
    const actual = getToken(input)
    const expected: GetTokenResult = {
      token: {
        ignored: true,
        type: 'WhiteSpace',
        value: '\u0020',
      },
      remainingInput,
    }
    expect(actual).toEqual(expected)
  })

  describe('Evaluator', () => {
    it.each([
      null,
      '\u0020',
      '\u0009',
    ])('should find %s', (prefix) => {
      const remainingInput = '#and the rest'
      const input = `${prefix === null ? '' : prefix}${remainingInput}`
      const actual = crawler(input, evaluate)
      const expectedValue = (prefix === null)
        ? null
        : {
          type: 'WhiteSpace',
          value: prefix as WhiteSpace['value'],
        } as WhiteSpace
        const expected: CrawlerResult<WhiteSpace> = [
          expectedValue,
          remainingInput,
        ]
        expect(actual).toEqual(expected)
    })
  })
})

import {crawler, CrawlerResult} from '../crawler'
import {GetTokenResult} from '../types'
import comma, {evaluate, Comma} from './comma'

describe('Comma', () => {
  it('should NOT return the Comma', () => {
    const input = 'This is not a comma.'
    const actual = comma(input)
    const expected: GetTokenResult = {
      token: null,
      remainingInput: input,
    }
    expect(actual).toEqual(expected)
  })

  it('should return the Comma', () => {
    const input = ',This is not a comma.'
    const actual = comma(input)
    const expected: GetTokenResult = {
      token: {
        type: 'Comma',
        ignored: true,
        value: ',',
      },
      remainingInput: 'This is not a comma.',
    }
    expect(actual).toEqual(expected)
  })
})

describe('Comma Evaluator', () => {
  const input = ',This is not a comma.'
  const actual = crawler(input, evaluate)
  const remaining = 'This is not a comma.'
  const expected: CrawlerResult<Comma> = [
    {
      type: 'Comma',
      value: ',',
    },
    remaining,
  ]
  expect(actual).toEqual(expected)
})

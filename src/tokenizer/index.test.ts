import {getNextToken} from "."

describe('getting tokens', () => {
  describe('Punctuator', () => {
    it.each([
      '!',
      '$',
      '(',
      ')',
      '...',
      ':',
      '=',
      '@',
      '[',
      ']',
      '{',
      '|',
      '}',
    ])('should find %s', (punctuator) => {
      const input = `${punctuator}asdf`
      const actual = getNextToken(input)
      expect(actual).toEqual(punctuator)
    })
  })

  describe('UnicodeBOM', () => {
    it.each([
      '\uFEFF',
    ])('should find %s', (token) => {
      const input = `${token}asdf`
      const actual = getNextToken(input)
      expect(actual).toEqual(token)
    })
  })

  describe('WhiteSpace', () => {
    it.each([
      '\u0009', // \t
      '\u0020', // space
    ])('should find %s', (token) => {
      const input = `${token}asdf`
      const actual = getNextToken(input)
      expect(actual).toEqual(token)
    })
  })

  describe('LineTerminator', () => {
    it.each([
      '\u000A',  // \n
      '\u000D',  // \r
      '\u000D\u000A',  // \r\n
    ])('should find %s', (token) => {
      const input = `${token}asdf`
      const actual = getNextToken(input)
      expect(actual).toEqual(token)
    })
  })

  describe('Comment', () => {
    it.each([
      [
        '# This is a supersweet comment with no newline!',
        '# This is a supersweet comment with no newline!',
      ],
      [
        '# This is a supersweet comment with a newline!',
        '# This is a supersweet comment with a newline!\nthis is something else',
      ]
    ])('should find %s', (expected, input) => {
      const actual = getNextToken(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('StringValue', () => {
    it.each([
      [
        `"This is a string"`,
        `"This is a string"blah blah blah`,
      ],
      [
        null,
        `"This is unterminated`,
      ],
    ])('should find %s', (expected, input) => {
      const actual = getNextToken(input)
      expect(actual).toEqual(expected)
    })

    it.each([
      [
        `"This has an invalid escape \\"`,
      ],
    ])('should throw', (input) => {
      expect(() => {
        getNextToken(input)
      }).toThrow()
    })
  })
})

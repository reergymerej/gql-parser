import {
  getNextToken,
  isBlockStringCharacter,
  isEscapedCharacter,
  isEscapedUnicode,
  isLineTerminator,
  isSourceCharacter,
  isStringCharacter,
} from '.'

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
    it.each(['\uFEFF'])('should find %s', (token) => {
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
      '\u000A', // \n
      '\u000D', // \r
      '\u000D\u000A', // \r\n
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
      ],
    ])('should find %s', (expected, input) => {
      const actual = getNextToken(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('StringValue', () => {
    it.each([
      ['"This is a string"', '"This is a string"blah blah blah'],
      [null, '"This is unterminated'],
    ])('should find %s', (expected, input) => {
      const actual = getNextToken(input)
      expect(actual).toEqual(expected)
    })

    it.each([['"This has an invalid escape \\"']])('should throw', (input) => {
      expect(() => {
        getNextToken(input)
      }).toThrow()
    })
  })
})

describe('SourceCharacter', () => {
  it.each([
    [true, 'a'],
    [true, '\u0009'],
    [false, '\u0008'],
    [false, '\x00'],
  ])('should return %s', (expected, char) => {
    const actual = isSourceCharacter(char)
    expect(actual).toEqual(expected)
  })
})

describe('BlockStringCharacter', () => {
  it.each([
    [false, '"""'],
    [true, '\\"""'],
    [true, 'h'],
  ])('should return %s for %s', (expected, value) => {
    const actual = isBlockStringCharacter(value)
    expect(actual).toEqual(expected)
  })
})

describe('EscapedCharacter', () => {
  it.each([
    [false, 'k'],
    [true, '"'],
    [true, '\\'],
    [true, '/'],
    [true, 'b'],
    [true, 'f'],
    [true, 'n'],
    [true, 'r'],
    [true, 't'],
  ])('should return %s for %s', (expected, value) => {
    const actual = isEscapedCharacter(value)
    expect(actual).toEqual(expected)
  })
})

describe('isEscapedUnicode', () => {
  it.each([
    [false, 'k'],
    [true, '00Af'],
  ])('should return %s for %s', (expected, value) => {
    const actual = isEscapedUnicode(value)
    expect(actual).toEqual(expected)
  })
})

describe('isLineTerminator', () => {
  it.each([
    [true, '\\u000A'],
    [true, '\\u000D\\u000A'],
    [true, '\\u000Dboop'],
  ])('should return %s for %s', (expected, value) => {
    const actual = isLineTerminator(value)
    expect(actual).toEqual(expected)
  })
})

describe('isStringCharacter', () => {
  it.each([
    [true, '\\t'],
    [true, '\\"'],
    [false, '\\'],
    [true, '\\u00Af'],
    [true, '\\u000L'],
    [true, 'r'],
    [false, '"'],
    [true, '\\u000A'],
  ])('should return %s for %s', (expected, value) => {
    const actual = isStringCharacter(value)
    expect(actual).toEqual(expected)
  })
})

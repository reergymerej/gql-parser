describe('getting tokens', () => {
  const getNextToken = (input: string): string => {
    return input[0]
  }

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
})

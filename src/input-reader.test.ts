import inputReader from './input-reader'

describe('peek', () => {
  it('should return the next character', () => {
    const input = 'please'
    inputReader.load(input)
    const actual = inputReader.peek()
    const expected = 'p'
    expect(actual).toBe(expected)
  })

  it('should keep peeking at the same char', () => {
    const input = 'please'
    inputReader.load(input)
    const expected = 'p'
    expect(inputReader.peek()).toBe(expected)
    expect(inputReader.peek()).toBe(expected)
  })

  it('should return the char by index', () => {
    const input = 'please'
    inputReader.load(input)
    const actual = inputReader.peek(3)
    const expected = 'a'
    expect(actual).toBe(expected)
  })
})

describe('consume', () => {
  it('should return the next character', () => {
    const input = 'please'
    inputReader.load(input)
    const actual = inputReader.consume()
    const expected = 'p'
    expect(actual).toBe(expected)
  })

  it('should return the char by index', () => {
    const input = 'please'
    inputReader.load(input)
    const actual = inputReader.consume(3)
    const expected = 'a'
    expect(actual).toBe(expected)
  })

  it('should consume the chars', () => {
    const input = 'please'
    inputReader.load(input)
    expect(inputReader.consume()).toBe('p')
    expect(inputReader.consume()).toBe('l')
    expect(inputReader.consume()).toBe('e')
  })
})

describe('isEOF', () => {
  it('should return false', () => {
    const input = 'please'
    inputReader.load(input)
    const actual = inputReader.isEOF()
    const expected = false
    expect(actual).toBe(expected)
  })

  it('should return true', () => {
    const input = ''
    inputReader.load(input)
    const actual = inputReader.isEOF()
    const expected = true
    expect(actual).toBe(expected)
  })
})

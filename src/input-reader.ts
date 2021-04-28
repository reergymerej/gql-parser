// https://medium.com/swlh/writing-a-parser-getting-started-44ba70bb6cc9

let _input: string

const peek = (k = 0): string => {
  return _input[k]
}

const consume = (k = 0): string => {
  const left = _input.substring(0, k)
  const char = _input[k]
  const right = _input.substring(k + 1)
  _input = left + right
  return char
}

const isEOF = (): boolean => {
  return _input.length === 0
}

const load = (input: string): void => {
  _input = input
}

export default {
  load,
  peek,
  consume,
  isEOF,
}

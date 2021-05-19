import {Evaluator} from '../crawler'

/*
UnicodeBOM ::
  Byte Order Mark (U+FEFF)
*/

export type UnicodeBOM = {
  type: 'UnicodeBOM',
  value: '\uFEFF',
}

export const evaluate: Evaluator<UnicodeBOM> = (reader) => {
  const read = reader.read(1)
  const isFound = read === '\uFEFF'
  const found: UnicodeBOM = {
    type: 'UnicodeBOM',
    value: '\uFEFF',
  }
  return isFound
    ? found
    : null
}

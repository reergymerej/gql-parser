import { Evaluator, getReader} from '../crawler'
import * as exponentIndicator from './exponent-indicator'
import * as sign from './sign'
import * as digit from './digit'

/*
ExponentPart ::
  ExponentIndicator Sign (opt) Digit (list)
*/

export type ExponentPart = {
  type: 'ExponentPart',
  value: string,
}

const getType = (head: string, tail: string): ExponentPart  => {
  const combined = `${head}${tail}`
  return {
    type: 'ExponentPart',
    value: combined as ExponentPart['value'],
  }
}

export const evaluate: Evaluator<ExponentPart> = (reader) => {
  const a = exponentIndicator.evaluate(reader)
  if (a) {
    const parts: string[] = []
    parts.push(a.value)
    let tailReader = getReader(reader.from(a.value.length))
    const b = sign.evaluate(tailReader)
    if (b) {
      parts.push(b.value)
      tailReader = getReader(tailReader.from(b.value.length))
    }
    const c = digit.getWhileIsDigit(tailReader)
    if (!c) {
      return null
    }
    parts.push(c)
    return getType(parts.join(''), '')
  }
  return null
}

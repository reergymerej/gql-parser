import { Evaluator} from '../crawler'
import * as sourceCharacter from '../source-character'
import * as lineTerminator from '../ignored/line-terminator'

/*
StringCharacter ::
  SourceCharacter but not " or \ or LineTerminator
  \u EscapedUnicode
  \ EscapedCharacter
*/

export type StringCharacter = {
  type: 'StringCharacter',
  value: string,
}

const getType = (values: string[]): StringCharacter  => {
  return {
    type: 'StringCharacter',
    value: values.join('') as StringCharacter['value'],
  }
}

const isForbidden = (value: string) => {
  return [
    '"',
    '\\',
  ].includes(value)
  || lineTerminator.isLineTerminator(value)
}

const getEscapedUnicode = (value: string): string | null => {
  const pattern = /^[0-9A-Fa-f]{4}/
  const match = pattern.exec(value)
  return match && match[0]
}

export const evaluate: Evaluator<StringCharacter> = (reader) => {
  const theSourceCharacter = sourceCharacter.evaluate(reader)
  if (theSourceCharacter) {
    if (!isForbidden(theSourceCharacter.value)) {
      return getType([theSourceCharacter.value])
    }
  }
  const head = reader.read(2)
  if (head === '\\u') {
    const parts: string[] = [head]
    const escapedUnicode = getEscapedUnicode(reader.from(head.length))
    if (escapedUnicode) {
      parts.push(escapedUnicode)
      return getType(parts)
    }
    console.log(parts)
  }
  return null
}

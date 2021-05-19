import * as digit from './digit'
import * as negativeSign from './negative-sign'
import * as nonZeroDigit from './non-zero-digit'
import {Evaluator, getReader, Reader} from '../crawler'
import {findIndex} from '../util'

/*
IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

export type IntegerPart = {
  type: 'IntegerPart',
  value: string
}

export const isIntegerPart = (value: string): boolean => {
  throw new Error('not implemented')
}

const getIntegerPartWithPrefix = (head: string) => (tail: string) => {
  const value = `${head}${tail}`
  const found: IntegerPart = {
    type: 'IntegerPart',
    value: value as IntegerPart['value'],
  }
  return found
}

const getWithNonZero = (reader: Reader, head: string) => {
  const tail = ''
  const digitsEndIndex = findIndex(reader, digit.startsWithDigits)
  const hasEndDigits = digitsEndIndex > -1
  if (hasEndDigits) {
    const endDigits = reader.read(digitsEndIndex)
    return getIntegerPartWithPrefix(head)(endDigits)
  }
  return getIntegerPartWithPrefix(head)(tail)
}

const nonZero = (reader: Reader, head: string) => {
  const value = nonZeroDigit.evaluate(reader)
  const nextIsNonZeroDigit = value !== null
  if (nextIsNonZeroDigit) {
    const foundValue = value && value.value || ''
    const tailReader = getReader(reader.from(foundValue?.length))
    return getWithNonZero(tailReader, head + foundValue)
  }
  return null
}

const afterNegativeSign = (reader: Reader, prefix: string) => {
  const nextChar = reader.read(1)
  const nextIsZero = nextChar === '0'
  if (nextIsZero) {
    return getIntegerPartWithPrefix(prefix)(nextChar)
  }
  return nonZero(reader, prefix)
}

const startsWithNegative = (reader: Reader, head: negativeSign.NegativeSign) => {
  const prefix = head.value
  const endReader = getReader(reader.from(head.value.length))
  return afterNegativeSign(endReader, prefix)
}

const startsWithoutNegative = (reader: Reader) => {
  const prefix = ''
  return afterNegativeSign(reader, prefix)
}

export const evaluate: Evaluator<IntegerPart> = (reader) => {
  const head = negativeSign.evaluate(reader)
  if (head) {
    return startsWithNegative(reader, head)
  }
  return startsWithoutNegative(reader)
}

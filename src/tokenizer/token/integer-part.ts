import * as digit from './digit'
import * as nonZeroDigit from './non-zero-digit'
import * as negativeSign from './negative-sign'
import {Evaluator, getReader, Reader} from '../crawler'
import {findIndex} from '../util'
import {StringPredicate} from '../types'

/*
IntegerPart ::
  NegativeSign (opt) 0
  NegativeSign (opt) NonZeroDigit Digit (list, opt)
*/

export type IntegerPart = {
  type: 'IntegerPart',
  value: string
}

export const isIntegerPart: StringPredicate = value => {
  const reader = getReader(value)
  return evaluate(reader) !== null
}

const getIntegerPartWithPrefix = (head: string) => (tail: string) => {
  const value = `${head}${tail}`
  const found: IntegerPart = {
    type: 'IntegerPart',
    value: value as IntegerPart['value'],
  }
  return found
}

const startsWithNonZero = (reader: Reader, head: string) => {
  const requiredNonZero = nonZeroDigit.evaluate(reader)
  if (requiredNonZero === null) {
    return null
  }
  const tail = digit.getWhileIsDigit(reader)
  return getIntegerPartWithPrefix(head)(tail)
}

const afterNegativeSign = (reader: Reader, prefix: string) => {
  const nextChar = reader.read(1)
  const nextIsZero = nextChar === '0'
  if (nextIsZero) {
    return getIntegerPartWithPrefix(prefix)(nextChar)
  }
  return startsWithNonZero(reader, prefix)
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

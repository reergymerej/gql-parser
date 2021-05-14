interface Reader {
  all: () => string
  consume: (count: number) => void
  read: (count: number) => string
}

export type FoundType = {
  type: string
  value: string
}
export type EvaluationResult = FoundType | null

export type Evaluator = (
  reader: Reader,
) => EvaluationResult

export type CrawlerResult = [
  FoundType | null,
  string,
]

const getReader = (input: string): Reader => {
  let remaining = input
  return {
    all: () => remaining,
    consume: (count) => remaining = remaining.substring(count),
    read: (count) => remaining.substring(0, count),
  }
}

export const crawler = (
  input: string,
  evaluate: Evaluator,
): CrawlerResult => {
  const reader = getReader(input)
  return [
    evaluate(reader),
    reader.all(),
  ]
}

interface Reader {
  all: () => string
  consume: (count: number) => void
  read: (count: number) => string
}

export type EvaluationResult<T> = T | null

export type Evaluator<T> = (
  reader: Reader,
) => EvaluationResult<T>

export type CrawlerResult<T> = [
  T | null,
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

type Crawler = <T>(
  input: string,
  evaluate: Evaluator<T>
) => CrawlerResult<T>

export const crawler: Crawler = (input, evaluate) => {
  const reader = getReader(input)
  return [
    evaluate(reader),
    reader.all(),
  ]
}

export type FoundType = {
  type: string
  value: string
}
export type EvaluationResult = FoundType | null

interface Reader {
  all: () => string
  consume: (count: number) => void
  read: (count: number) => string
}

// Make sure you consider the input length before making a determination!
// Maybe rework later to allow the evaluator to ask for more input and only let
// them return true/false.
export type Evaluator = (
  reader: Reader,
) => EvaluationResult

export type CrawlerResult = [
  FoundType | null,
  string
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
  const evaluationResult: EvaluationResult = evaluate(reader)

  if (evaluationResult === null) {
    return [
      null,
      reader.all(),
    ]
  }

  return [
    evaluationResult,
    reader.all(),
  ]
}

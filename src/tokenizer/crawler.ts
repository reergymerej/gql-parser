export type EvaluationResult = true | false | 'not sure'

// Make sure you consider the input length before making a determination!
// Maybe rework later to allow the evaluator to ask for more input and only let
// them return true/false.
export type Evaluator = (input: string) => EvaluationResult

export type FoundType = {
  type: string
  value: string
}
export type CrawlerResult = [
  FoundType | null,
  string
]

export const crawler = (input: string, evaluate: Evaluator): CrawlerResult => {
  let stringToEvaluate = ''
  let evaluationResult: EvaluationResult = 'not sure'

  for (let i = 0; i < input.length && evaluationResult === 'not sure'; i++) {
    stringToEvaluate += input[i]
    evaluationResult = evaluate(stringToEvaluate)
  }

  if (evaluationResult === 'not sure'
      || evaluationResult === false
     ) {
    return [
      null,
      input,
    ]
  }

  const remaining = 'bar'
  return [
    {
      type: 'A_FOO',
      value: stringToEvaluate
    },
    remaining,
  ]
}

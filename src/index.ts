type Token = any
const tokenizer = (gql: string): Token[] => {
  console.log(gql)
  return []
}

type Lexed = any
const lexer = (tokens: Token[]): Lexed[] => {
  console.log(tokens)
  return []
}


type AST = any
const parser = (lexed: Lexed[]): AST => {
  console.log(lexed)
  return {}
}

const gql = 'not real'
const tokens = tokenizer(gql)
const lexed = lexer(tokens)
const ast = parser(lexed)

console.log(ast)

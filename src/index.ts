import tokenizer, {Token} from "./tokenizer"

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

const gql = `
schema {
  query: MyQueryRootType
  mutation: MyMutationRootType
}

# Super sweet comment

type MyQueryRootType {
  someField: String
}
`
const tokens = tokenizer(gql)
const lexed = lexer(tokens)
const ast = parser(lexed)

console.log(ast)

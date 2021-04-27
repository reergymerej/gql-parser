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
"""
A simple GraphQL schema which is well described.
"""
schema {
  query: MyQueryRootType
  mutation: MyMutationRootType
}

# This is a supersweet comment.

type MyQueryRootType {
  someField: String

  """
  Translates a string from a given language into a different language.
  """
  translate(
    "The original language that \`text\` is provided in."
    fromLanguage: Language

    "The translated language to be returned."
    toLanguage: Language

    "The text to be translated."
    text: String
  ): String
}

# This is another supersweet comment.

type MyMutationRootType {
  setSomeField(to: String): String
  setName(name: "Zuck") {
    newName
  }
}

"""
The set of languages supported by \`translate\`.
"""
enum Language {
  "English"
  EN

  "French"
  FR

  "Chinese"
  CH
}
`
const tokens = tokenizer(gql)
const lexed = lexer(tokens)
const ast = parser(lexed)

console.log(ast)

# GQL Parser

Parse some GQL


GraphQL Syntax

https://spec.graphql.org/June2018/#sec-Appendix-Grammar-Summary

Tokenizer - breaks text into tokens
Lexer - attaches some meta data to the tokens
Parser - creates AST from lexer

## Build

```
 yarn build
```

## Usage

```
   node .
```

## Dev

```
# compile
tsc --watch

# auto-run
nodemon .
```

--------------------------------------------------------------------------------

## Language Notes

request sources are "documents"

Documents may have:
* operations
  * queries
  * mutations
  * subscriptions
* fragments

If a Document contains only one operation, that operation may be unnamed or
represented in the shorthand form, which omits both the query keyword and
operation name.

--------------------------------------------------------------------------------

## Tokens

May be multiple characters
May be ignored
May be lexical


Find StringValue, then Comment.  The rest should be simple.

  Punctuator
Name
IntValue
FloatValue
StringValue
  UnicodeBOM
  WhiteSpace
  LineTerminator
  Comment
Comma

For each type, start, add while still in pattern, end.

--------------------------------------------------------------------------------

scanner - reads input
lexer - converts input to tokens (atomic elements of language)
parser - converts tokens to AST

What are the atomic elements (tokens) in GQL?
https://spec.graphql.org/June2018/#sec-Appendix-Grammar-Summary.Lexical-Tokens


--------------------------------------------------------------------------------

The spec is goofy.  Leading zeros in IntegerPart are kinda silly.
https://github.com/graphql/graphql-spec/issues/572
0 is OK
00 is read as two IntegerPart, 0 0
100 is 100
003 is read as 0 0 3


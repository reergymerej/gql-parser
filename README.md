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

type TypeSystemDefinition = any
type TypeSystemExtension = any
type OperationDefinition = any
type FragmentDefinition = any

type ExecutableDefinition =
  | OperationDefinition
  | FragmentDefinition

type Definition =
  | ExecutableDefinition
  | TypeSystemDefinition
  | TypeSystemExtension

export type Document = Definition[]

export enum Count {
  ONE,
  ONE_OR_FEWER,
  ONE_OR_MORE,
  ANY,
}

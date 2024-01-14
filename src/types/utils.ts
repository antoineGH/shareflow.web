type CamelToSnake<T extends string> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
    ? `${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}${CamelToSnake<R>}`
    : ''

export type CamelCaseToSnakeCase<T extends object> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K]
}

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S

export type SnakeCaseToCamelCase<T extends object> = {
  [K in keyof T as SnakeToCamel<Extract<K, string>>]: T[K]
}

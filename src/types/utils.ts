export type ObjectValues<T> = T[keyof T]

export type Nullable<T> = T extends object
  ? { [K in keyof T]: T[K] | null }
  : T | null

export type DeepNullable<T> = T extends object
  ? {
      [K in keyof T]: DeepNullable<T[K]> | null
    }
  : T | null

export type NonNullableFields<T extends object> = {
  [K in keyof T]: T[K] extends object ? NonNullable<T[K]> : Exclude<T[K], null>
}

export type PartialWithRequired<
  T extends object,
  K extends keyof T,
> = Partial<T> & Required<Pick<T, K>>

export interface ValidationError {
  [key: string]: ValidationError | string | string[] | null
}

export type OptionT<V> = {
  label?: string | null
  value: V
}

export type CamelToSnake<T extends string> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
    ? `${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}${CamelToSnake<R>}`
    : ''

export type CamelCaseToSnakeCase<T extends object> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K]
}

export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S

export type SnakeCaseToCamelCase<T extends object> = {
  [K in keyof T as SnakeToCamel<Extract<K, string>>]: T[K]
}

export type ErrorMessage = {
  parameter: string | null
  message: string
}

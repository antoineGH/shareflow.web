import { SnakeCaseToCamelCase } from './utils'

type Storage = {
  storage_used: number
  total_storage: number
}

export type SettingsApi = {
  storage: SnakeCaseToCamelCase<Storage>
}

export type Settings = SnakeCaseToCamelCase<SettingsApi>

export type GetStorageReturnType =
  | {
      storage: Settings['storage']
      error?: never
    }
  | {
      storage?: never
      error: Error
    }

import { SnakeCaseToCamelCase } from './utils'

type ListItemKey =
  | 'download'
  | 'comments'
  | 'tags'
  | 'rename'
  | 'delete'
  | 'restore'
  | 'remove'

export type FileApi = {
  id: number
  name: string
  size: string
  modified: string
  path?: string
  action: ListItemKey[]
}

export type FileDataApi = {
  files: FileApi[]
  count_files: number
  count_folders: number
  total_size: string
}

export type File = SnakeCaseToCamelCase<FileApi>
export type FileData = SnakeCaseToCamelCase<FileDataApi>

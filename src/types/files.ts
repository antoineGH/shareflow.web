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

export type GetFilesReturnType =
  | {
      filesData: FileData[]
      error?: never
    }
  | {
      filesData?: never
      error: Error
    }

export type PostFileReturnType =
  | {
      file: File
      error?: never
    }
  | {
      file?: never
      error: Error
    }

export type PutFileReturnType =
  | {
      file: File
      error?: never
    }
  | {
      file?: never
      error: Error
    }

export type DeleteFileReturnType =
  | {
      fileId: File['id']
      error?: never
    }
  | {
      fileId?: never
      error: Error
    }

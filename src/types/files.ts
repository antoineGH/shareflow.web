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
  created_at: string
  updated_at: string
  is_favorite?: boolean
  is_deleted?: boolean
  is_folder?: boolean
  actions: ListItemKey[]
}

export type FileDataApi = {
  files: SnakeCaseToCamelCase<FileApi>[]
  count_files?: number
  count_folders?: number
  total_size?: string
}

export type File = SnakeCaseToCamelCase<FileApi>
export type FileData = SnakeCaseToCamelCase<FileDataApi>

export type RowFile = Pick<File, 'id' | 'name' | 'size' | 'updatedAt'>

export type PostFileDataApi = {
  file: File
  countFiles: FileData['countFiles']
  countFolders: FileData['countFolders']
  totalSize: FileData['totalSize']
}

export type PostFileData = SnakeCaseToCamelCase<PostFileDataApi>

export type PutFileDataApi = {
  file: File
  countFiles: FileData['countFiles']
  countFolders: FileData['countFolders']
  totalSize: FileData['totalSize']
}

export type PutFileData = SnakeCaseToCamelCase<PutFileDataApi>

export type PatchFileData = Partial<SnakeCaseToCamelCase<FileApi>>

export type GetFilesReturnType =
  | {
      filesData: FileData
      error?: never
    }
  | {
      filesData?: never
      error: Error
    }

export type PostFileReturnType =
  | {
      fileData: PostFileData
      error?: never
    }
  | {
      fileData?: never
      error: Error
    }

export type PutFileReturnType =
  | {
      fileData: PutFileData
      error?: never
    }
  | {
      fileData?: never
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

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

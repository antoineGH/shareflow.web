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

export type PutFileDataApi = {
  file: File
  count_files: FileData['countFiles']
  count_folders: FileData['countFolders']
  total_size: FileData['totalSize']
}

export type PatchFileDataApi = {
  file: File
  count_files: FileData['countFiles']
  count_folders: FileData['countFolders']
  total_Size: FileData['totalSize']
}

export type PutFileData = SnakeCaseToCamelCase<PutFileDataApi>

export type PatchFileData = SnakeCaseToCamelCase<PatchFileDataApi>

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

export type PatchFileReturnType =
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

export type DeleteFilesReturnType =
  | {
      filesIds: File['id'][]
      error?: never
    }
  | {
      filesIds?: never
      error: Error
    }

export type RestoreFilesReturnType =
  | {
      filesIds: File['id'][]
      error?: never
    }
  | {
      filesIds?: never
      error: Error
    }

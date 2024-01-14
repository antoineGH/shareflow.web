import { CamelCaseToSnakeCase, SnakeCaseToCamelCase } from './utils'

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
  size: number
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
  total_size?: number
}

export type FileUpload = Pick<FileT, 'name' | 'isFolder'> & {
  file?: File
  parentId?: number
}

export type FolderUpload = Pick<FileT, 'name' | 'isFolder'> & {
  parentId?: number
}
export type FolderUploadApi = CamelCaseToSnakeCase<FolderUpload>

export type FileT = SnakeCaseToCamelCase<FileApi>
export type FileData = SnakeCaseToCamelCase<FileDataApi>

export type RowFile = Pick<FileT, 'id' | 'name' | 'size' | 'updatedAt'>

type PutFileDataApi = {
  file: FileT
  count_files: FileData['countFiles']
  count_folders: FileData['countFolders']
  total_size: FileData['totalSize']
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
      file: FileT
      error?: never
    }
  | {
      file?: never
      error: Error
    }

export type PutFileReturnType =
  | {
      file: FileT
      error?: never
    }
  | {
      file?: never
      error: Error
    }

export type PatchFileReturnType =
  | {
      file: FileT
      error?: never
    }
  | {
      file?: never
      error: Error
    }

export type DeleteFileReturnType =
  | {
      fileId: FileT['id']
      error?: never
    }
  | {
      fileId?: never
      error: Error
    }

export type DeleteFilesReturnType =
  | {
      filesIds: FileT['id'][]
      error?: never
    }
  | {
      filesIds?: never
      error: Error
    }

export type RestoreFilesReturnType =
  | {
      filesIds: FileT['id'][]
      error?: never
    }
  | {
      filesIds?: never
      error: Error
    }

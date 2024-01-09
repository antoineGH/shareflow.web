import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  deleteFile,
  deleteFiles,
  getFiles,
  patchFile,
  patchFiles,
  postFile,
  postFolder,
  putFile,
} from 'api/files'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type {
  FileData,
  FileT,
  FileUpload,
  FolderUpload,
  PutFileData,
} from 'types/files'
import { TagApi } from 'types/tags'
import { SnakeCaseToCamelCase } from 'types/utils'

const fetchFiles = createAsyncThunk<
  FileData,
  {
    userId: number
    filter: 'all_files' | 'is_deleted' | 'is_favorite'
    tags?: (SnakeCaseToCamelCase<TagApi> | string)[]
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/fetchFiles',
  async ({ userId, filter, tags }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, filesData } = await getFiles(userId, filter, tags, signal)

      if (error) throw new HttpResponseError(null, error.message)

      return filesData
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const createFolder = createAsyncThunk<
  FileT,
  {
    userId: number
    newFolder: FolderUpload
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/createFolder',
  async ({ userId, newFolder, cb }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, file } = await postFolder(userId, newFolder, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const createFile = createAsyncThunk<
  FileT,
  {
    userId: number
    newFile: FileUpload
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/createFile',
  async ({ userId, newFile, cb }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, file } = await postFile(userId, newFile, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const updateFile = createAsyncThunk<
  PutFileData,
  {
    userId: number
    fileId: FileT['id']
    fileToUpdate: FileT
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/updateFile',
  async (
    { userId, fileId, fileToUpdate },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, file } = await putFile(
        userId,
        fileId,
        fileToUpdate,
        signal,
      )

      if (error) throw new HttpResponseError(null, error.message)

      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const partialUpdateFile = createAsyncThunk<
  FileT,
  {
    userId: number
    fileId: FileT['id']
    updates: Partial<FileT>
    isFavoritePage?: boolean
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/patchFile',
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { userId, fileId, updates, isFavoritePage, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, file } = await patchFile(userId, fileId, updates, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const partialRemoveRestoreFile = createAsyncThunk<
  FileT,
  {
    userId: number
    fileId: FileT['id']
    updates: Partial<FileT>
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/partialRemoveRestoreFile',
  async (
    { userId, fileId, updates, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, file } = await patchFile(userId, fileId, updates, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const partialRemoveRestoreFiles = createAsyncThunk<
  FileT['id'][],
  {
    userId: number
    filesToRestoreIds: FileT['id'][]
    updates: Partial<FileT>
    cb?: () => void
  }
>(
  'files/partialRemoveRestoreFiles',
  async (
    { userId, filesToRestoreIds, updates, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, filesIds } = await patchFiles(
        userId,
        filesToRestoreIds,
        updates,
        signal,
      )
      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return filesIds
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const removeFile = createAsyncThunk<
  FileT['id'],
  {
    userId: number
    fileToDeleteId: FileT['id']
    cb?: () => void
  }
>(
  'files/removeFile',
  async (
    { userId, fileToDeleteId, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, fileId } = await deleteFile(userId, fileToDeleteId, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return fileId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const removeFiles = createAsyncThunk<
  FileT['id'][],
  {
    userId: number
    filesToDeleteIds: FileT['id'][]
    cb?: () => void
  }
>(
  'files/removeFiles',
  async (
    { userId, filesToDeleteIds, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, filesIds } = await deleteFiles(
        userId,
        filesToDeleteIds,
        signal,
      )
      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return filesIds
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

export {
  fetchFiles,
  createFile,
  createFolder,
  updateFile,
  partialUpdateFile,
  partialRemoveRestoreFile,
  partialRemoveRestoreFiles,
  removeFile,
  removeFiles,
}

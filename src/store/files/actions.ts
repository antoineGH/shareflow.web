import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  deleteFile,
  deleteFiles,
  getFiles,
  patchFile,
  patchFiles,
  postFile,
  putFile,
} from 'api/files'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { File, FileData, PostFileData, PutFileData } from 'types/files'
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
  async ({ userId, filter, tags }, { signal, rejectWithValue }) => {
    try {
      const { error, filesData } = await getFiles(userId, filter, tags, signal)

      if (error) throw new HttpResponseError(null, error.message)

      return filesData
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const createFile = createAsyncThunk<
  PostFileData,
  {
    userId: number
    newFile: Omit<File, 'id'>
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/createFile',
  async ({ userId, newFile }, { signal, rejectWithValue }) => {
    try {
      const { error, fileData } = await postFile(userId, newFile, signal)

      if (error) throw new HttpResponseError(null, error.message)

      return fileData
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const updateFile = createAsyncThunk<
  PutFileData,
  {
    userId: number
    fileId: File['id']
    fileToUpdate: File
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/updateFile',
  async ({ userId, fileId, fileToUpdate }, { signal, rejectWithValue }) => {
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
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const partialUpdateFile = createAsyncThunk<
  File,
  {
    userId: number
    fileId: File['id']
    updates: Partial<File>
    isFavoritePage?: boolean
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/patchFile',
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { userId, fileId, updates, isFavoritePage, cb },
    { signal, rejectWithValue },
  ) => {
    try {
      const { error, file } = await patchFile(userId, fileId, updates, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const partialRemoveRestoreFile = createAsyncThunk<
  File,
  {
    userId: number
    fileId: File['id']
    updates: Partial<File>
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/partialRemoveRestoreFile',
  async ({ userId, fileId, updates, cb }, { signal, rejectWithValue }) => {
    try {
      const { error, file } = await patchFile(userId, fileId, updates, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return file
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const partialRemoveRestoreFiles = createAsyncThunk<
  File['id'][],
  {
    userId: number
    filesToRestoreIds: File['id'][]
    updates: Partial<File>
    cb?: () => void
  }
>(
  'files/partialRemoveRestoreFiles',
  async (
    { userId, filesToRestoreIds, updates, cb },
    { signal, rejectWithValue },
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
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeFile = createAsyncThunk<
  File['id'],
  {
    userId: number
    fileToDeleteId: File['id']
    cb?: () => void
  }
>(
  'files/removeFile',
  async ({ userId, fileToDeleteId, cb }, { signal, rejectWithValue }) => {
    try {
      const { error, fileId } = await deleteFile(userId, fileToDeleteId, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return fileId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeFiles = createAsyncThunk<
  File['id'][],
  {
    userId: number
    filesToDeleteIds: File['id'][]
    cb?: () => void
  }
>(
  'files/removeFiles',
  async ({ userId, filesToDeleteIds, cb }, { signal, rejectWithValue }) => {
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
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export {
  fetchFiles,
  createFile,
  updateFile,
  partialUpdateFile,
  partialRemoveRestoreFile,
  partialRemoveRestoreFiles,
  removeFile,
  removeFiles,
}

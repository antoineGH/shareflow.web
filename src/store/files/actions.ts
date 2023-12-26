import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteFile, getFiles, patchFile, postFile, putFile } from 'api/files'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type {
  File,
  FileData,
  PatchFileData,
  PostFileData,
  PutFileData,
} from 'types/files'

const fetchFiles = createAsyncThunk<
  FileData,
  {
    userId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('files/fetchFiles', async ({ userId }, { signal, rejectWithValue }) => {
  try {
    const { error, filesData } = await getFiles(userId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return filesData
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

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

      if (error) throw new HttpResponseError(error.code || null, error.message)

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
      const { error, fileData } = await putFile(
        userId,
        fileId,
        fileToUpdate,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return fileData
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const partialUpdateFile = createAsyncThunk<
  PatchFileData,
  {
    userId: number
    fileId: File['id']
    updates: Partial<File>
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'files/patchFile',
  async ({ userId, fileId, updates }, { signal, rejectWithValue }) => {
    try {
      const { error, file } = await patchFile(userId, fileId, updates, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return file
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
  }
>(
  'files/removeFile',
  async ({ userId, fileToDeleteId }, { signal, rejectWithValue }) => {
    try {
      const { error, fileId } = await deleteFile(userId, fileToDeleteId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return fileId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchFiles, createFile, updateFile, partialUpdateFile, removeFile }

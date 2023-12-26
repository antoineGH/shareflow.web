import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFiles } from 'api/files'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { FileData } from 'types/files'

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

export { fetchFiles }

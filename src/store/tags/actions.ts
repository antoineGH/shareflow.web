import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTags } from 'api/tags'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { Tag } from 'types/tags'

const fetchTags = createAsyncThunk<
  Tag[],
  { fileId: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('tags/fetchTags', async ({ fileId }, { signal, rejectWithValue }) => {
  try {
    const { error, tags } = await getTags(fileId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return tags
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

export { fetchTags }

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getComments } from 'api/comments'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import { Comment } from 'types/comments'

const fetchComments = createAsyncThunk<
  Comment[],
  {
    userId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('comments/fetchComments', async ({ userId }, { signal, rejectWithValue }) => {
  try {
    const { error, comments } = await getComments(userId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return comments
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

export { fetchComments }

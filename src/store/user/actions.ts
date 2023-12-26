import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from 'api/users'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { User } from 'types/users'

const fetchUser = createAsyncThunk<
  User,
  {
    userId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('user/fetchUser', async ({ userId }, { signal, rejectWithValue }) => {
  try {
    const { error, user } = await getUser(userId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return user
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

export { fetchUser }

import { createAsyncThunk } from '@reduxjs/toolkit'

import { getUser, patchUser, putUser } from 'api/users'
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
>(
  'user/fetchUser',
  async ({ userId }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, user } = await getUser(userId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return user
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const updateUser = createAsyncThunk<
  void,
  {
    userId: number
    newUser: Omit<User, 'id' | 'createdAt'>
    cb: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'user/updateUser',
  async ({ userId, newUser, cb }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error } = await putUser(userId, newUser, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      cb?.()
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const patchUserPassword = createAsyncThunk<
  void,
  {
    userId: number
    newPassword: string
    cb: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'user/patchUserPassword',
  async (
    { userId, newPassword, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error } = await patchUser(userId, newPassword, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      cb?.()
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

// eslint-disable-next-line
export { fetchUser, updateUser, patchUserPassword }

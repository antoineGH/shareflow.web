import { createAsyncThunk } from '@reduxjs/toolkit'

import { getStorage } from 'api/settings'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import { Settings } from 'types/settings'

const fetchStorage = createAsyncThunk<
  Settings['storage'],
  {
    userId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'storage/fetchStorage',
  async ({ userId }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, storage } = await getStorage(userId, signal)
      if (error) throw new HttpResponseError(error.code || null, error.message)

      return storage
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

// eslint-disable-next-line
export { fetchStorage }

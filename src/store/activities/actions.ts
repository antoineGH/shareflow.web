import { createAsyncThunk } from '@reduxjs/toolkit'
import { catchAsyncThunk } from 'store/utils'
import { getActivities } from 'api/activities'
import { HttpResponseError } from 'helpers/errors'
import type { RootState } from 'store/store'
import type { Activity } from 'types/activities'

const fetchActivities = createAsyncThunk<
  Activity[],
  {
    userId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'activties/fetchActivities',
  async ({ userId }, { signal, rejectWithValue }) => {
    try {
      const { error, activities } = await getActivities(userId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return activities
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchActivities }

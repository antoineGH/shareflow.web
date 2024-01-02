import { createAsyncThunk } from '@reduxjs/toolkit'
import { catchAsyncThunk } from 'store/utils'
import { getActivities, postActivities } from 'api/activities'
import { HttpResponseError } from 'helpers/errors'
import type { RootState } from 'store/store'
import type { Activity } from 'types/activities'

const fetchActivities = createAsyncThunk<
  Activity[],
  {
    userId: number
    fileId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'activties/fetchActivities',
  async ({ userId, fileId }, { signal, rejectWithValue }) => {
    try {
      const { error, activities } = await getActivities(userId, fileId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return activities
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const createActivity = createAsyncThunk<
  Activity,
  {
    userId: number
    fileId: number
    newActivity: Omit<
      Activity,
      'id' | 'createdAt' | 'updatedAt' | 'userId' | 'fileId'
    >
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'activities/createActivity',
  async ({ userId, fileId, newActivity }, { signal, rejectWithValue }) => {
    try {
      const { error, activity } = await postActivities(
        userId,
        fileId,
        newActivity,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return activity
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchActivities, createActivity }

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import type { Activity } from 'types/activities'
import { fetchActivities } from './actions'
import { getStateSliceFromError } from 'store/utils'

type InitialState = {
  status: Status
}

const initialState: InitialState = {
  status: Status.IDLE,
}

export const ActivitiesAdapter = createEntityAdapter({
  selectId: (activity: Activity) => activity.id,
})

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: ActivitiesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchActivities.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      ActivitiesAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default activitiesSlice.reducer

export const { selectById, selectAll } = ActivitiesAdapter.getSelectors()
